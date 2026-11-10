import { fetchSafeWithSsrfRedirects, isPrivateIp, validateUrlSsrf, validateBrowserRequestUrl } from './ssrf-validator';
import * as dns from 'dns';

describe('fetchSafeWithSsrfRedirects (SSRF & Stream Timeout Unit Tests)', () => {
  let originalFetch: typeof globalThis.fetch;

  beforeEach(() => {
    originalFetch = globalThis.fetch;
  });

  afterEach(() => {
    globalThis.fetch = originalFetch;
    jest.restoreAllMocks();
  });

  it('should reject with timeout error and NOT return partial body when stream stalls and reader.cancel() resolves with done=true', async () => {
    let readerCancelled = false;
    let resolveCancel: () => void;
    const cancelPromise = new Promise<void>((resolve) => {
      resolveCancel = resolve;
    });

    const mockReader = {
      readCount: 0,
      read: jest.fn().mockImplementation(function (this: any) {
        this.readCount = (this.readCount || 0) + 1;
        if (this.readCount === 1) {
          return Promise.resolve({
            done: false,
            value: new TextEncoder().encode('<html><body>Partial chunk received...'),
          });
        }
        // Stalled second read resolves with done=true when reader.cancel() is called
        return cancelPromise.then(() => ({ done: true, value: undefined }));
      }),
      cancel: jest.fn().mockImplementation(() => {
        readerCancelled = true;
        resolveCancel();
      }),
    };

    globalThis.fetch = jest.fn().mockResolvedValue({
      status: 200,
      headers: new Map([['content-type', 'text/html']]),
      body: { getReader: () => mockReader },
    } as any);

    await expect(
      fetchSafeWithSsrfRedirects('https://example.com', { timeoutMs: 100 }),
    ).rejects.toThrow('Request timed out after 100 ms.');

    expect(readerCancelled).toBe(true);
    expect(mockReader.cancel).toHaveBeenCalled();
  });

  it('should successfully complete reading body when stream finishes normally (normal EOF)', async () => {
    const mockReader = {
      readCount: 0,
      read: jest.fn().mockImplementation(function (this: any) {
        this.readCount = (this.readCount || 0) + 1;
        if (this.readCount === 1) {
          return Promise.resolve({
            done: false,
            value: new TextEncoder().encode('<html><body>Full Content</body></html>'),
          });
        }
        return Promise.resolve({ done: true, value: undefined });
      }),
      cancel: jest.fn(),
    };

    globalThis.fetch = jest.fn().mockResolvedValue({
      status: 200,
      headers: new Map([['content-type', 'text/html']]),
      body: { getReader: () => mockReader },
    } as any);

    const result = await fetchSafeWithSsrfRedirects('https://example.com', { timeoutMs: 2000 });
    expect(result.html).toBe('<html><body>Full Content</body></html>');
    expect(result.status).toBe(200);
  });

  it('should reject oversized payload (>2MB) and call reader.cancel()', async () => {
    const mockReader = {
      readCount: 0,
      read: jest.fn().mockImplementation(function (this: any) {
        this.readCount = (this.readCount || 0) + 1;
        if (this.readCount === 1) {
          return Promise.resolve({
            done: false,
            value: new Uint8Array(2.5 * 1024 * 1024), // 2.5MB payload
          });
        }
        return Promise.resolve({ done: true, value: undefined });
      }),
      cancel: jest.fn(),
    };

    globalThis.fetch = jest.fn().mockResolvedValue({
      status: 200,
      headers: new Map([['content-type', 'text/html']]),
      body: { getReader: () => mockReader },
    } as any);

    await expect(
      fetchSafeWithSsrfRedirects('https://example.com', { timeoutMs: 2000, maxSizeBytes: 2 * 1024 * 1024 }),
    ).rejects.toThrow('Response payload exceeded maximum safe size limit (2097152 bytes).');

    expect(mockReader.cancel).toHaveBeenCalled();
  });

  it('should reject when initial fetch network request times out', async () => {
    globalThis.fetch = jest.fn().mockImplementation((_url: string, opts: any) => {
      return new Promise((_, reject) => {
        opts.signal.addEventListener('abort', () => {
          reject(new Error('Request timed out after 50 ms.'));
        });
      });
    });

    await expect(
      fetchSafeWithSsrfRedirects('https://example.com', { timeoutMs: 50 }),
    ).rejects.toThrow('Request timed out after 50 ms.');
  });
});

describe('isPrivateIp Unit Tests', () => {
  it('should identify public IPv4 addresses as non-private', () => {
    expect(isPrivateIp('8.8.8.8')).toBe(false);
    expect(isPrivateIp('1.1.1.1')).toBe(false);
    expect(isPrivateIp('142.250.190.46')).toBe(false);
    expect(isPrivateIp('93.184.216.34')).toBe(false);
  });

  it('should identify loopback and localhost as private', () => {
    expect(isPrivateIp('127.0.0.1')).toBe(true);
    expect(isPrivateIp('127.0.1.1')).toBe(true);
    expect(isPrivateIp('127.255.255.255')).toBe(true);
    expect(isPrivateIp('0.0.0.0')).toBe(true);
    expect(isPrivateIp('localhost')).toBe(true);
  });

  it('should identify private RFC1918 subnets as private', () => {
    expect(isPrivateIp('10.0.0.1')).toBe(true);
    expect(isPrivateIp('10.255.255.255')).toBe(true);
    expect(isPrivateIp('172.16.0.1')).toBe(true);
    expect(isPrivateIp('172.31.255.255')).toBe(true);
    expect(isPrivateIp('192.168.0.1')).toBe(true);
    expect(isPrivateIp('192.168.1.100')).toBe(true);
  });

  it('should identify cloud metadata and link-local IP addresses as private', () => {
    expect(isPrivateIp('169.254.169.254')).toBe(true);
    expect(isPrivateIp('169.254.1.1')).toBe(true);
  });

  it('should identify CGNAT, benchmark, documentation and multicast as private', () => {
    expect(isPrivateIp('100.64.0.1')).toBe(true);
    expect(isPrivateIp('100.127.255.255')).toBe(true);
    expect(isPrivateIp('198.18.0.1')).toBe(true);
    expect(isPrivateIp('198.51.100.1')).toBe(true);
    expect(isPrivateIp('203.0.113.1')).toBe(true);
    expect(isPrivateIp('224.0.0.1')).toBe(true);
    expect(isPrivateIp('240.0.0.1')).toBe(true);
    expect(isPrivateIp('255.255.255.255')).toBe(true);
  });

  it('should identify IPv6 loopback, link-local, ULA, and bracketed formats as private', () => {
    expect(isPrivateIp('::1')).toBe(true);
    expect(isPrivateIp('[::1]')).toBe(true);
    expect(isPrivateIp('fe80::1')).toBe(true);
    expect(isPrivateIp('[fe80::1]')).toBe(true);
    expect(isPrivateIp('fc00::1')).toBe(true);
    expect(isPrivateIp('[fd12:3456:789a::1]')).toBe(true);
    expect(isPrivateIp('::')).toBe(true);
  });

  it('should identify IPv4-mapped IPv6 addresses as private', () => {
    expect(isPrivateIp('::ffff:127.0.0.1')).toBe(true);
    expect(isPrivateIp('::ffff:10.0.0.1')).toBe(true);
    expect(isPrivateIp('::ffff:169.254.169.254')).toBe(true);
    expect(isPrivateIp('::ffff:8.8.8.8')).toBe(false);
  });

  it('should handle IP with port strings correctly', () => {
    expect(isPrivateIp('127.0.0.1:8080')).toBe(true);
    expect(isPrivateIp('192.168.1.1:3000')).toBe(true);
    expect(isPrivateIp('8.8.8.8:443')).toBe(false);
    expect(isPrivateIp('[::1]:8080')).toBe(true);
  });
});

describe('validateUrlSsrf Unit Tests', () => {
  it('should allow public websites', async () => {
    jest.spyOn(dns.promises, 'lookup').mockResolvedValue([{ address: '93.184.216.34', family: 4 }] as any);
    const res = await validateUrlSsrf('https://example.com');
    expect(res.isValid).toBe(true);
    expect(res.normalizedUrl).toBe('https://example.com/');
  });

  it('should block localhost and loopback targets', async () => {
    const res1 = await validateUrlSsrf('http://localhost:3000');
    expect(res1.isValid).toBe(false);

    const res2 = await validateUrlSsrf('http://127.0.0.1:8080');
    expect(res2.isValid).toBe(false);

    const res3 = await validateUrlSsrf('http://[::1]:5000');
    expect(res3.isValid).toBe(false);
  });

  it('should block cloud metadata and internal hostnames', async () => {
    const res1 = await validateUrlSsrf('http://169.254.169.254/latest/meta-data/');
    expect(res1.isValid).toBe(false);

    const res2 = await validateUrlSsrf('http://metadata.google.internal/');
    expect(res2.isValid).toBe(false);

    const res3 = await validateUrlSsrf('http://instance-data');
    expect(res3.isValid).toBe(false);

    const res4 = await validateUrlSsrf('http://api.local');
    expect(res4.isValid).toBe(false);

    const res5 = await validateUrlSsrf('http://service.internal');
    expect(res5.isValid).toBe(false);
  });

  it('should block domains resolving to private IP addresses (DNS Rebinding prevention)', async () => {
    jest.spyOn(dns.promises, 'lookup').mockResolvedValue([
      { address: '127.0.0.1', family: 4 }
    ] as any);

    const res = await validateUrlSsrf('http://rebind-test.com');
    expect(res.isValid).toBe(false);
    expect(res.error).toContain('Domain resolves to a forbidden private IP address.');
  });
});

describe('validateBrowserRequestUrl (Chromium Request Interception Guard)', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should fast-path allow safe in-memory schemes (data: and about:blank)', async () => {
    const res1 = await validateBrowserRequestUrl('data:image/svg+xml;base64,PHN2Zy...');
    expect(res1.isAllowed).toBe(true);

    const res2 = await validateBrowserRequestUrl('about:blank');
    expect(res2.isAllowed).toBe(true);
  });

  it('should block unsafe non-HTTP schemes (file:, ftp:, chrome:)', async () => {
    const res1 = await validateBrowserRequestUrl('file:///etc/passwd');
    expect(res1.isAllowed).toBe(false);
    expect(res1.reason).toContain('Disallowed protocol');

    const res2 = await validateBrowserRequestUrl('ftp://public.mirror.com/file');
    expect(res2.isAllowed).toBe(false);

    const res3 = await validateBrowserRequestUrl('chrome://settings');
    expect(res3.isAllowed).toBe(false);
  });

  it('should block subresource requests to localhost, loopback, and metadata', async () => {
    const res1 = await validateBrowserRequestUrl('http://127.0.0.1:3000/api/admin/stats');
    expect(res1.isAllowed).toBe(false);

    const res2 = await validateBrowserRequestUrl('http://localhost:5000/graphql');
    expect(res2.isAllowed).toBe(false);

    const res3 = await validateBrowserRequestUrl('http://169.254.169.254/latest/meta-data/');
    expect(res3.isAllowed).toBe(false);

    const res4 = await validateBrowserRequestUrl('http://[::1]:3000/');
    expect(res4.isAllowed).toBe(false);
  });

  it('should block subresource requests to internal hostnames (.local, .internal)', async () => {
    const res1 = await validateBrowserRequestUrl('http://service.local/image.png');
    expect(res1.isAllowed).toBe(false);

    const res2 = await validateBrowserRequestUrl('http://database.internal/query');
    expect(res2.isAllowed).toBe(false);
  });

  it('should block requests when DNS resolves to a private IP (DNS rebinding bypass protection)', async () => {
    jest.spyOn(dns.promises, 'lookup').mockResolvedValue([
      { address: '10.0.0.1', family: 4 }
    ] as any);

    const res = await validateBrowserRequestUrl('https://evil-rebind.com/script.js');
    expect(res.isAllowed).toBe(false);
    expect(res.reason).toContain('Domain evil-rebind.com resolves to private IP');
  });

  it('should allow legitimate public subresource requests', async () => {
    jest.spyOn(dns.promises, 'lookup').mockResolvedValue([
      { address: '142.250.190.46', family: 4 }
    ] as any);

    const res = await validateBrowserRequestUrl('https://fonts.googleapis.com/css2?family=Inter');
    expect(res.isAllowed).toBe(true);
  });

  it('should utilize DNS cache to avoid duplicate network lookups', async () => {
    const lookupSpy = jest.spyOn(dns.promises, 'lookup').mockResolvedValue([
      { address: '93.184.216.34', family: 4 }
    ] as any);

    const dnsCache = new Map<string, boolean>();

    const res1 = await validateBrowserRequestUrl('https://cdn.example.com/lib.js', dnsCache);
    expect(res1.isAllowed).toBe(true);
    expect(lookupSpy).toHaveBeenCalledTimes(1);

    // Second request to same hostname should use cache
    const res2 = await validateBrowserRequestUrl('https://cdn.example.com/style.css', dnsCache);
    expect(res2.isAllowed).toBe(true);
    expect(lookupSpy).toHaveBeenCalledTimes(1); // not called again
  });
});
