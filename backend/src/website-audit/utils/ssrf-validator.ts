import * as dns from 'dns';
import { URL } from 'url';

export interface SsrfValidationResult {
  isValid: boolean;
  normalizedUrl?: string;
  error?: string;
}

/**
 * SSRF Validation and Safe Redirect-Aware HTTP Client
 *
 * Security Architecture:
 * 1. Protocol Restrictions: Allows HTTP and HTTPS only.
 * 2. Static Hostname & IP Filtering: Blocks known loopbacks, local names, cloud metadata endpoints,
 *    and reserved/private IPv4 and IPv6 subnets.
 * 3. Pre-flight DNS Resolution: Resolves target hostnames prior to fetching and verifies that all
 *    resolved IP addresses (IPv4 & IPv6) belong to public IP space.
 * 4. Redirect Validation: Manually steps through HTTP redirects and validates each target URL with SSRF checks.
 * 5. Streamed Size Enforcement: Checks Content-Length headers and streams body chunks to cap downloads at 2 MB.
 *
 * Note on DNS Rebinding Risk:
 * Pre-flight DNS validation (`dns.promises.lookup`) verifies domain IP resolution at validation time.
 * Because standard Node `fetch` (Undici) executes a separate internal DNS lookup during the HTTP connect phase
 * without custom socket-level IP pinning, a malicious DNS server configured with short TTL (TTL=0) could theoretically
 * serve a public IP during pre-flight lookup and switch to a private IP (e.g., 127.0.0.1) during the subsequent fetch.
 * Complete mitigation against DNS-rebinding requires custom HTTP Agents or Undici custom dispatchers with IP pinning.
 * The pre-flight DNS validation below enforces strong baseline validation against all standard static and dynamic private targets.
 */
export async function validateUrlSsrf(inputUrl: string): Promise<SsrfValidationResult> {
  if (!inputUrl || typeof inputUrl !== 'string') {
    return { isValid: false, error: 'URL is required.' };
  }

  let trimmedUrl = inputUrl.trim();
  if (!/^https?:\/\//i.test(trimmedUrl)) {
    trimmedUrl = 'https://' + trimmedUrl;
  }

  let parsed: URL;
  try {
    parsed = new URL(trimmedUrl);
  } catch {
    return { isValid: false, error: 'Invalid URL format.' };
  }

  // Check scheme
  if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') {
    return { isValid: false, error: 'Only HTTP and HTTPS protocols are supported.' };
  }

  const hostname = parsed.hostname.toLowerCase();

  // Check dangerous hostnames
  if (
    hostname === 'localhost' ||
    hostname === '127.0.0.1' ||
    hostname === '0.0.0.0' ||
    hostname.endsWith('.local') ||
    hostname.endsWith('.internal') ||
    hostname === 'instance-data' ||
    hostname === 'metadata.google.internal'
  ) {
    return { isValid: false, error: 'Target URL resolves to a forbidden private host.' };
  }

  // Check IPv4 directly
  if (isPrivateIp(hostname)) {
    return { isValid: false, error: 'Private IP addresses are not permitted.' };
  }

  // Resolve DNS to verify destination IP before fetching
  try {
    const addresses = await dns.promises.lookup(hostname, { all: true });
    for (const addr of addresses) {
      if (isPrivateIp(addr.address)) {
        return { isValid: false, error: 'Domain resolves to a forbidden private IP address.' };
      }
    }
  } catch (err: any) {
    return { isValid: false, error: `DNS resolution failed for domain: ${hostname}` };
  }

  return {
    isValid: true,
    normalizedUrl: parsed.toString(),
  };
}

export function isPrivateIp(ip: string): boolean {
  if (!ip || typeof ip !== 'string') return true;

  // Strip brackets from IPv6 (e.g. "[::1]" -> "::1") and normalize
  let cleanIp = ip.trim().toLowerCase().replace(/^\[|\]$/g, '');

  // Strip port if present (e.g. "127.0.0.1:8080" -> "127.0.0.1" or bracketed "[::1]:8080")
  const colonCount = (cleanIp.match(/:/g) || []).length;
  if (colonCount === 1) {
    cleanIp = cleanIp.split(':')[0];
  } else if (cleanIp.includes(']:')) {
    cleanIp = cleanIp.split(']:')[0].replace(/^\[/, '');
  }

  if (cleanIp === '127.0.0.1' || cleanIp === '0.0.0.0' || cleanIp === 'localhost') return true;

  // Handle IPv4-mapped IPv6 addresses (::ffff:0:0/96)
  if (cleanIp.startsWith('::ffff:')) {
    const ipv4Part = cleanIp.slice(7);
    if (/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/.test(ipv4Part)) {
      return isPrivateIp(ipv4Part);
    }
    const hexParts = ipv4Part.split(':');
    if (hexParts.length === 2) {
      const p1 = parseInt(hexParts[0], 16);
      const p2 = parseInt(hexParts[1], 16);
      if (!isNaN(p1) && !isNaN(p2)) {
        return isPrivateIp(`${(p1 >> 8) & 0xff}.${p1 & 0xff}.${(p2 >> 8) & 0xff}.${p2 & 0xff}`);
      }
    }
    return true;
  }

  // Handle NAT64 Well-Known Prefix (64:ff9b::/96)
  // Used by DNS64/NAT64 networks to synthesize IPv6 addresses for IPv4 endpoints.
  // Validate the embedded 32-bit IPv4 address rather than unconditionally blocking the prefix.
  if (cleanIp.startsWith('64:ff9b::')) {
    const suffix = cleanIp.slice(9);
    if (/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/.test(suffix)) {
      return isPrivateIp(suffix);
    }
    const hexParts = suffix.split(':');
    if (hexParts.length === 2) {
      const p1 = parseInt(hexParts[0], 16);
      const p2 = parseInt(hexParts[1], 16);
      if (!isNaN(p1) && !isNaN(p2)) {
        return isPrivateIp(`${(p1 >> 8) & 0xff}.${p1 & 0xff}.${(p2 >> 8) & 0xff}.${p2 & 0xff}`);
      }
    }
    return true; // Malformed NAT64 address is rejected safely
  }

  // 0.0.0.0/8 (Current network / "this" host)
  if (/^0\./.test(cleanIp)) return true;

  // 10.0.0.0/8 (Private network)
  if (/^10\./.test(cleanIp)) return true;

  // 100.64.0.0/10 (Shared Address Space / CGNAT: 100.64.0.0 – 100.127.255.255)
  if (/^100\.(6[4-9]|[7-9][0-9]|1[01][0-9]|12[0-7])\./.test(cleanIp)) return true;

  // 127.0.0.0/8 (Loopback: 127.0.0.0 - 127.255.255.255)
  if (/^127\./.test(cleanIp)) return true;

  // 169.254.0.0/16 (Link-local / Cloud metadata: 169.254.0.0 - 169.254.255.255)
  if (/^169\.254\./.test(cleanIp)) return true;

  // 172.16.0.0/12 (Private network: 172.16.0.0 – 172.31.255.255)
  if (/^172\.(1[6-9]|2[0-9]|3[01])\./.test(cleanIp)) return true;

  // 192.0.0.0/24 (IETF Protocol Assignments)
  if (/^192\.0\.0\./.test(cleanIp)) return true;

  // 192.0.2.0/24 (TEST-NET-1)
  if (/^192\.0\.2\./.test(cleanIp)) return true;

  // 192.88.99.0/24 (6to4 Relay Anycast)
  if (/^192\.88\.99\./.test(cleanIp)) return true;

  // 192.168.0.0/16 (Private network: 192.168.0.0 - 192.168.255.255)
  if (/^192\.168\./.test(cleanIp)) return true;

  // 198.18.0.0/15 (Network benchmark tests: 198.18.0.0 - 198.19.255.255)
  if (/^198\.(18|19)\./.test(cleanIp)) return true;

  // 198.51.100.0/24 (TEST-NET-2)
  if (/^198\.51\.100\./.test(cleanIp)) return true;

  // 203.0.113.0/24 (TEST-NET-3)
  if (/^203\.0\.113\./.test(cleanIp)) return true;

  // 224.0.0.0/4 (Multicast: 224.0.0.0 – 239.255.255.255)
  // 240.0.0.0/4 (Reserved for future use: 240.0.0.0 – 255.255.255.255)
  const firstOctetMatch = cleanIp.match(/^(\d{1,3})\./);
  if (firstOctetMatch) {
    const firstOctet = parseInt(firstOctetMatch[1], 10);
    if (firstOctet >= 224) return true;
  }

  // IPv6 Checks:
  // ::1 (loopback), :: (unspecified), fe80::/10 (link-local), fc00::/7 (unique local private),
  // ff00::/8 (multicast), 2001:db8::/32 (documentation), 100::/64 (discard prefix), 64:ff9b::/96 (translation)
  if (
    cleanIp === '::1' ||
    cleanIp === '::' ||
    /^fe[89ab]/i.test(cleanIp) ||
    /^f[cd]/i.test(cleanIp) ||
    /^ff/i.test(cleanIp) ||
    /^2001:db8:/i.test(cleanIp) ||
    /^100::/i.test(cleanIp)
  ) {
    return true;
  }

  return false;
}

export interface BrowserRequestValidationResult {
  isAllowed: boolean;
  reason?: string;
}

/**
 * Validates subresource, iframe, script, stylesheet, or redirect requests initiated inside Chromium.
 * Enforces protocol restrictions, dangerous host checks, IP literal validation, and pre-flight DNS checks.
 */
export async function validateBrowserRequestUrl(
  requestUrl: string,
  dnsCache?: Map<string, boolean>
): Promise<BrowserRequestValidationResult> {
  if (!requestUrl || typeof requestUrl !== 'string') {
    return { isAllowed: false, reason: 'Missing request URL.' };
  }

  const trimmed = requestUrl.trim();

  // Fast-path safe in-memory data URIs and about:blank
  if (trimmed.startsWith('data:') || trimmed === 'about:blank') {
    return { isAllowed: true };
  }

  // Handle blob URLs by validating inner URL origin: blob:https://example.com/uuid
  if (trimmed.startsWith('blob:')) {
    const innerUrl = trimmed.slice(5);
    try {
      const innerParsed = new URL(innerUrl);
      if (innerParsed.protocol !== 'http:' && innerParsed.protocol !== 'https:') {
        return { isAllowed: false, reason: `Disallowed blob origin protocol: ${innerParsed.protocol}` };
      }
      return validateBrowserRequestUrl(innerUrl, dnsCache);
    } catch {
      return { isAllowed: false, reason: 'Invalid blob URL origin format.' };
    }
  }

  let parsed: URL;
  try {
    parsed = new URL(trimmed);
  } catch {
    return { isAllowed: false, reason: 'Malformed URL.' };
  }

  // Protocol check: only http and https allowed for network requests
  if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') {
    return { isAllowed: false, reason: `Disallowed protocol: ${parsed.protocol}` };
  }

  const hostname = parsed.hostname.toLowerCase();
  if (!hostname) {
    return { isAllowed: false, reason: 'Empty hostname.' };
  }

  // Dangerous / internal hostname checks
  if (
    hostname === 'localhost' ||
    hostname === '127.0.0.1' ||
    hostname === '0.0.0.0' ||
    hostname === '[::1]' ||
    hostname.endsWith('.local') ||
    hostname.endsWith('.internal') ||
    hostname === 'instance-data' ||
    hostname === 'metadata.google.internal' ||
    hostname === 'metadata'
  ) {
    return { isAllowed: false, reason: `Forbidden host name: ${hostname}` };
  }

  // Direct IP check (IPv4 and IPv6)
  if (isPrivateIp(hostname)) {
    return { isAllowed: false, reason: `Forbidden private IP: ${hostname}` };
  }

  // Check DNS cache
  if (dnsCache && dnsCache.has(hostname)) {
    const cachedAllowed = dnsCache.get(hostname)!;
    return cachedAllowed
      ? { isAllowed: true }
      : { isAllowed: false, reason: `DNS resolved to private IP or failed (cached for ${hostname})` };
  }

  // Resolve DNS with a timeout (2000ms)
  try {
    let timer: NodeJS.Timeout | undefined;
    const lookupPromise = dns.promises.lookup(hostname, { all: true });
    const timeoutPromise = new Promise<dns.LookupAddress[]>((_, reject) => {
      timer = setTimeout(() => reject(new Error('DNS lookup timeout')), 2000);
      if (typeof timer.unref === 'function') timer.unref();
    });

    const addresses = await Promise.race([lookupPromise, timeoutPromise]);
    if (timer) clearTimeout(timer);

    if (!addresses || addresses.length === 0) {
      if (dnsCache) dnsCache.set(hostname, false);
      return { isAllowed: false, reason: `No IP addresses found for domain: ${hostname}` };
    }

    for (const addr of addresses) {
      if (isPrivateIp(addr.address)) {
        if (dnsCache) dnsCache.set(hostname, false);
        return { isAllowed: false, reason: `Domain ${hostname} resolves to private IP: ${addr.address}` };
      }
    }

    if (dnsCache) dnsCache.set(hostname, true);
    return { isAllowed: true };
  } catch (err: any) {
    if (dnsCache) dnsCache.set(hostname, false);
    return { isAllowed: false, reason: `DNS resolution failed for domain: ${hostname} (${err.message})` };
  }
}

export interface SafeFetchResult {
  html: string;
  headers: Record<string, string>;
  status: number;
  finalUrl: string;
}

export async function fetchSafeWithSsrfRedirects(
  initialUrl: string,
  options: { timeoutMs?: number; maxRedirects?: number; maxSizeBytes?: number } = {}
): Promise<SafeFetchResult> {
  const timeoutMs = options.timeoutMs ?? 10000;
  const maxRedirects = options.maxRedirects ?? 5;
  const maxSizeBytes = options.maxSizeBytes ?? 2 * 1024 * 1024; // 2MB limit

  let currentUrl = initialUrl;
  let redirectCount = 0;

  while (redirectCount <= maxRedirects) {
    const ssrfCheck = await validateUrlSsrf(currentUrl);
    if (!ssrfCheck.isValid || !ssrfCheck.normalizedUrl) {
      throw new Error(`SSRF Validation failed for URL ${currentUrl}: ${ssrfCheck.error}`);
    }
    currentUrl = ssrfCheck.normalizedUrl;

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), timeoutMs);

    try {
      const res = await fetch(currentUrl, {
        method: 'GET',
        signal: controller.signal,
        redirect: 'manual',
        headers: {
          'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36 CoreSlashAuditBot/1.0',
          Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        },
      });

      // Handle Redirects safely
      if ([301, 302, 303, 307, 308].includes(res.status)) {
        const locationHeader = res.headers.get('location');
        if (!locationHeader) {
          throw new Error(`HTTP ${res.status} redirect missing Location header`);
        }

        const nextUrl = new URL(locationHeader, currentUrl).toString();
        redirectCount++;
        currentUrl = nextUrl;
        continue;
      }

      const headers: Record<string, string> = {};
      res.headers.forEach((val, key) => {
        headers[key.toLowerCase()] = val;
      });

      // Honor Content-Length if present
      const contentLengthHeader = headers['content-length'];
      if (contentLengthHeader) {
        const contentLength = parseInt(contentLengthHeader, 10);
        if (!isNaN(contentLength) && contentLength > maxSizeBytes) {
          throw new Error(`Response Content-Length (${contentLength} bytes) exceeded maximum safe limit (${maxSizeBytes} bytes).`);
        }
      }

      // Read response body with streaming size enforcement & abort signal cancellation
      let bodyText = '';
      if (res.body && typeof (res.body as any).getReader === 'function') {
        const reader = (res.body as any).getReader();

        // Attach abort handler so when controller aborts, the active stream reader is cancelled immediately
        const onAbort = () => {
          try {
            reader.cancel('Request timeout exceeded during body stream read');
          } catch {}
        };
        controller.signal.addEventListener('abort', onAbort);

        try {
          // If controller is already aborted before reading body, cancel reader immediately
          if (controller.signal.aborted) {
            onAbort();
            throw new Error(`Request timed out after ${timeoutMs} ms.`);
          }

          const chunks: Uint8Array[] = [];
          let bytesReceived = 0;

          while (true) {
            const { done, value } = await reader.read();
            if (controller.signal.aborted) {
              throw new Error(`Request timed out after ${timeoutMs} ms.`);
            }
            if (done) break;
            if (value) {
              bytesReceived += value.byteLength;
              if (bytesReceived > maxSizeBytes) {
                try { reader.cancel(); } catch {}
                throw new Error(`Response payload exceeded maximum safe size limit (${maxSizeBytes} bytes).`);
              }
              chunks.push(value);
            }
          }

          if (controller.signal.aborted) {
            throw new Error(`Request timed out after ${timeoutMs} ms.`);
          }

          const combined = new Uint8Array(bytesReceived);
          let offset = 0;
          for (const chunk of chunks) {
            combined.set(chunk, offset);
            offset += chunk.byteLength;
          }
          bodyText = new TextDecoder('utf-8').decode(combined);
        } finally {
          controller.signal.removeEventListener('abort', onAbort);
        }
      } else {
        bodyText = await res.text();
        if (bodyText.length > maxSizeBytes) {
          throw new Error(`Response payload exceeded maximum safe size limit (${maxSizeBytes} bytes).`);
        }
      }

      return {
        html: bodyText,
        headers,
        status: res.status,
        finalUrl: currentUrl,
      };
    } finally {
      clearTimeout(timeout);
    }
  }

  throw new Error(`Exceeded maximum allowed redirects (${maxRedirects}).`);
}
