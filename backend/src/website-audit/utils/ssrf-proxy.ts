import * as http from 'http';
import * as net from 'net';
import * as dns from 'dns';
import * as stream from 'stream';
import { URL } from 'url';
import { isPrivateIp } from './ssrf-validator';
import { Logger } from '@nestjs/common';

const logger = new Logger('SsrfProxy');

export interface SsrfProxyInstance {
  port: number;
  server: http.Server;
  close: () => Promise<void>;
}

export interface DnsVerificationResult {
  isValid: boolean;
  targetIp?: string;
  error?: string;
}

/**
 * Resolves a hostname and verifies that all returned addresses are public.
 * If safe, returns the pinned public IP address to connect to.
 */
export async function resolveAndVerifyDns(
  hostname: string
): Promise<DnsVerificationResult> {
  const cleanHost = hostname.trim().toLowerCase().replace(/^\[|\]$/g, '');

  // Check static forbidden hosts
  if (
    cleanHost === 'localhost' ||
    cleanHost === '127.0.0.1' ||
    cleanHost === '0.0.0.0' ||
    cleanHost === '::1' ||
    cleanHost.endsWith('.local') ||
    cleanHost.endsWith('.internal') ||
    cleanHost === 'instance-data' ||
    cleanHost === 'metadata.google.internal' ||
    cleanHost === 'metadata'
  ) {
    return { isValid: false, error: `Forbidden host name: ${cleanHost}` };
  }

  // Check IP literal directly
  if (isPrivateIp(cleanHost)) {
    return { isValid: false, error: `Private IP address prohibited: ${cleanHost}` };
  }

  // If already a valid public IPv4 literal
  if (/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/.test(cleanHost)) {
    return { isValid: true, targetIp: cleanHost };
  }

  try {
    let timer: NodeJS.Timeout | undefined;
    const lookupPromise = dns.promises.lookup(cleanHost, { all: true });
    const timeoutPromise = new Promise<dns.LookupAddress[]>((_, reject) => {
      timer = setTimeout(() => reject(new Error('DNS lookup timeout')), 2500);
      if (typeof timer.unref === 'function') timer.unref();
    });

    const addresses = await Promise.race([lookupPromise, timeoutPromise]);
    if (timer) clearTimeout(timer);

    if (!addresses || addresses.length === 0) {
      return { isValid: false, error: `No DNS records found for: ${cleanHost}` };
    }

    let chosenPublicIp: string | undefined;

    for (const addr of addresses) {
      if (isPrivateIp(addr.address)) {
        return { isValid: false, error: `Domain ${cleanHost} resolves to private IP: ${addr.address}` };
      }
      if (!chosenPublicIp) {
        chosenPublicIp = addr.address;
      }
    }

    return { isValid: true, targetIp: chosenPublicIp };
  } catch (err: any) {
    return { isValid: false, error: `DNS resolution failed for ${cleanHost}: ${err.message}` };
  }
}

/**
 * Creates an in-process TCP-level forward and CONNECT tunnel proxy on 127.0.0.1.
 *
 * Enforces destination IP pinning:
 * Resolves hostnames at the TCP connect boundary and connects sockets directly
 * to the verified public IP address (net.connect(port, publicIp)).
 *
 * Completely eliminates DNS rebinding (TOCTOU) because Chromium never resolves DNS directly,
 * and the proxy pins the TCP connection to the validated public IP address before piping traffic.
 */
export async function createSsrfProxy(): Promise<SsrfProxyInstance> {
  const activeSockets = new Set<stream.Duplex | net.Socket>();

  const server = http.createServer(async (req, res) => {
    // Plain HTTP forward proxy handler
    try {
      if (!req.url) {
        res.writeHead(400, { 'Content-Type': 'text/plain' });
        res.end('Missing URL');
        return;
      }

      let parsed: URL;
      try {
        parsed = new URL(req.url);
      } catch {
        res.writeHead(400, { 'Content-Type': 'text/plain' });
        res.end('Invalid URL');
        return;
      }

      const hostname = parsed.hostname.toLowerCase();
      if (!hostname || isPrivateIp(hostname)) {
        res.writeHead(403, { 'Content-Type': 'text/plain' });
        res.end('Access Denied: Private destination prohibited');
        return;
      }

      // Resolve DNS and verify all IP addresses
      const lookupResult = await resolveAndVerifyDns(hostname);
      if (!lookupResult.isValid || !lookupResult.targetIp) {
        res.writeHead(403, { 'Content-Type': 'text/plain' });
        res.end(`Access Denied: ${lookupResult.error || 'Destination prohibited'}`);
        return;
      }

      // Pin TCP socket to the verified public IP address
      const targetPort = parsed.port ? parseInt(parsed.port, 10) : 80;
      const proxyReq = http.request(
        {
          host: lookupResult.targetIp,
          port: targetPort,
          method: req.method,
          path: parsed.pathname + parsed.search,
          headers: {
            ...req.headers,
            host: parsed.host,
          },
          timeout: 8000,
        },
        (proxyRes) => {
          res.writeHead(proxyRes.statusCode || 200, proxyRes.headers);
          proxyRes.pipe(res);
        }
      );

      proxyReq.on('error', (err) => {
        if (!res.headersSent) {
          res.writeHead(502, { 'Content-Type': 'text/plain' });
          res.end(`Bad Gateway: ${err.message}`);
        }
      });

      proxyReq.on('timeout', () => {
        proxyReq.destroy();
        if (!res.headersSent) {
          res.writeHead(504, { 'Content-Type': 'text/plain' });
          res.end('Gateway Timeout');
        }
      });

      req.pipe(proxyReq);
    } catch (err: any) {
      if (!res.headersSent) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end(`Proxy internal error: ${err.message}`);
      }
    }
  });

  // HTTPS CONNECT Tunneling Handler
  server.on('connect', async (req, clientSocket, head) => {
    activeSockets.add(clientSocket);
    clientSocket.on('close', () => activeSockets.delete(clientSocket));

    try {
      const urlParts = (req.url || '').split(':');
      const hostname = urlParts[0].toLowerCase();
      const port = urlParts[1] ? parseInt(urlParts[1], 10) : 443;

      if (!hostname || isPrivateIp(hostname)) {
        clientSocket.write('HTTP/1.1 403 Forbidden\r\nContent-Type: text/plain\r\n\r\nAccess Denied');
        clientSocket.destroy();
        return;
      }

      // Resolve DNS and verify all addresses
      const lookupResult = await resolveAndVerifyDns(hostname);
      if (!lookupResult.isValid || !lookupResult.targetIp) {
        clientSocket.write('HTTP/1.1 403 Forbidden\r\nContent-Type: text/plain\r\n\r\nAccess Denied: DNS check failed');
        clientSocket.destroy();
        return;
      }

      // Physically connect to the PINNED public IP address
      const remoteSocket = net.connect(
        {
          host: lookupResult.targetIp,
          port,
          timeout: 8000,
        },
        () => {
          clientSocket.write('HTTP/1.1 200 Connection Established\r\n\r\n');
          if (head && head.length > 0) {
            remoteSocket.write(head);
          }
          clientSocket.pipe(remoteSocket);
          remoteSocket.pipe(clientSocket);
        }
      );

      activeSockets.add(remoteSocket);
      remoteSocket.on('close', () => activeSockets.delete(remoteSocket));

      remoteSocket.on('error', () => {
        try {
          clientSocket.write('HTTP/1.1 502 Bad Gateway\r\n\r\n');
        } catch {}
        clientSocket.destroy();
      });

      clientSocket.on('error', () => {
        remoteSocket.destroy();
      });

      remoteSocket.on('timeout', () => {
        remoteSocket.destroy();
        clientSocket.destroy();
      });
    } catch {
      try {
        clientSocket.write('HTTP/1.1 500 Internal Server Error\r\n\r\n');
      } catch {}
      clientSocket.destroy();
    }
  });

  return new Promise((resolve, reject) => {
    server.listen(0, '127.0.0.1', () => {
      const addr = server.address();
      const port = typeof addr === 'object' && addr ? addr.port : 0;
      logger.log(`SSRF Guard Proxy listening on 127.0.0.1:${port}`);

      resolve({
        port,
        server,
        close: async () => {
          for (const socket of activeSockets) {
            try {
              socket.destroy();
            } catch {}
          }
          activeSockets.clear();
          return new Promise<void>((closeRes) => {
            server.close(() => closeRes());
          });
        },
      });
    });

    server.on('error', (err) => reject(err));
  });
}
