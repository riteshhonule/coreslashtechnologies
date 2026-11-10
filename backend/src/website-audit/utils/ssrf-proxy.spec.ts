import { createSsrfProxy, resolveAndVerifyDns } from './ssrf-proxy';
import * as dns from 'dns';
import * as http from 'http';
import * as net from 'net';

describe('ssrf-proxy (Destination IP Pinning & DNS Rebinding Protection)', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('resolveAndVerifyDns Unit Tests', () => {
    it('should resolve public hostnames and return the pinned public target IP', async () => {
      jest.spyOn(dns.promises, 'lookup').mockResolvedValue([
        { address: '93.184.216.34', family: 4 },
      ] as any);

      const result = await resolveAndVerifyDns('example.com');
      expect(result.isValid).toBe(true);
      expect(result.targetIp).toBe('93.184.216.34');
    });

    it('should reject localhost, loopback, and metadata directly', async () => {
      const res1 = await resolveAndVerifyDns('localhost');
      expect(res1.isValid).toBe(false);

      const res2 = await resolveAndVerifyDns('127.0.0.1');
      expect(res2.isValid).toBe(false);

      const res3 = await resolveAndVerifyDns('169.254.169.254');
      expect(res3.isValid).toBe(false);

      const res4 = await resolveAndVerifyDns('metadata.google.internal');
      expect(res4.isValid).toBe(false);
    });

    it('should reject when DNS resolves to a private IP (DNS Rebinding simulation)', async () => {
      // Step 1: Simulated initial lookup returns public IP
      jest.spyOn(dns.promises, 'lookup').mockResolvedValueOnce([
        { address: '93.184.216.34', family: 4 },
      ] as any);

      const check1 = await resolveAndVerifyDns('rebind.attacker.com');
      expect(check1.isValid).toBe(true);
      expect(check1.targetIp).toBe('93.184.216.34');

      // Step 2: Simulated subsequent lookup rebinds to loopback IP (TTL=0 exploit)
      jest.spyOn(dns.promises, 'lookup').mockResolvedValueOnce([
        { address: '127.0.0.1', family: 4 },
      ] as any);

      const check2 = await resolveAndVerifyDns('rebind.attacker.com');
      expect(check2.isValid).toBe(false);
      expect(check2.error).toContain('resolves to private IP: 127.0.0.1');
    });
  });

  describe('createSsrfProxy Functional Tests', () => {
    let proxy: { port: number; server: http.Server; close: () => Promise<void> };

    afterEach(async () => {
      if (proxy) {
        await proxy.close();
      }
    });

    it('should bind to 127.0.0.1 on an ephemeral port and close cleanly', async () => {
      proxy = await createSsrfProxy();
      expect(proxy.port).toBeGreaterThan(0);
      const addr = proxy.server.address() as net.AddressInfo;
      expect(addr.address).toBe('127.0.0.1');
    });

    it('should reject CONNECT tunnel requests targeting localhost or private IPs with HTTP 403', async () => {
      proxy = await createSsrfProxy();

      const socket = net.connect(proxy.port, '127.0.0.1');
      const responseData = await new Promise<string>((resolve) => {
        socket.on('connect', () => {
          socket.write('CONNECT 127.0.0.1:3000 HTTP/1.1\r\nHost: 127.0.0.1:3000\r\n\r\n');
        });
        socket.on('data', (chunk) => {
          resolve(chunk.toString());
        });
      });

      expect(responseData).toContain('HTTP/1.1 403 Forbidden');
      expect(responseData).toContain('Access Denied');
    });

    it('should reject CONNECT tunnel requests targeting metadata IP with HTTP 403', async () => {
      proxy = await createSsrfProxy();

      const socket = net.connect(proxy.port, '127.0.0.1');
      const responseData = await new Promise<string>((resolve) => {
        socket.on('connect', () => {
          socket.write('CONNECT 169.254.169.254:80 HTTP/1.1\r\nHost: 169.254.169.254:80\r\n\r\n');
        });
        socket.on('data', (chunk) => {
          resolve(chunk.toString());
        });
      });

      expect(responseData).toContain('HTTP/1.1 403 Forbidden');
    });

    it('should reject plain HTTP requests targeting private addresses with HTTP 403', async () => {
      proxy = await createSsrfProxy();

      const res = await new Promise<http.IncomingMessage>((resolve, reject) => {
        const req = http.request(
          {
            host: '127.0.0.1',
            port: proxy.port,
            method: 'GET',
            path: 'http://192.168.1.1/admin',
          },
          (response) => resolve(response)
        );
        req.on('error', reject);
        req.end();
      });

      expect(res.statusCode).toBe(403);
    });
  });
});

