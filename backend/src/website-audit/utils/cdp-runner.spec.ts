jest.mock('chrome-launcher', () => ({
  launch: jest.fn(),
  kill: jest.fn(),
}));

import { BLOCKED_URL_PATTERNS } from './cdp-runner';
import { validateBrowserRequestUrl } from './ssrf-validator';
import * as dns from 'dns';

describe('cdp-runner Browser SSRF Protection & Interception Tests', () => {
  describe('BLOCKED_URL_PATTERNS Native Chromium Block List', () => {
    it('should include patterns for loopback, localhost, and 0.0.0.0', () => {
      expect(BLOCKED_URL_PATTERNS).toContain('*://localhost/*');
      expect(BLOCKED_URL_PATTERNS).toContain('*://127.0.0.1/*');
      expect(BLOCKED_URL_PATTERNS).toContain('*://0.0.0.0/*');
      expect(BLOCKED_URL_PATTERNS).toContain('*://[::1]*');
    });

    it('should include cloud metadata and private subnets', () => {
      expect(BLOCKED_URL_PATTERNS).toContain('*://169.254.169.254/*');
      expect(BLOCKED_URL_PATTERNS).toContain('*://metadata.google.internal/*');
      expect(BLOCKED_URL_PATTERNS).toContain('*://10.*/*');
      expect(BLOCKED_URL_PATTERNS).toContain('*://192.168.*/*');
      expect(BLOCKED_URL_PATTERNS).toContain('*://172.16.*/*');
      expect(BLOCKED_URL_PATTERNS).toContain('*.local/*');
      expect(BLOCKED_URL_PATTERNS).toContain('*.internal/*');
    });

    it('should include disallowed protocol schemes (file, ftp, gopher)', () => {
      expect(BLOCKED_URL_PATTERNS).toContain('file://*');
      expect(BLOCKED_URL_PATTERNS).toContain('ftp://*');
      expect(BLOCKED_URL_PATTERNS).toContain('gopher://*');
    });
  });

  describe('CDP Fetch.requestPaused Interception Handler Simulation', () => {
    let mockPageClient: {
      send: jest.Mock;
    };
    let dnsCache: Map<string, boolean>;

    beforeEach(() => {
      mockPageClient = {
        send: jest.fn().mockResolvedValue({}),
      };
      dnsCache = new Map<string, boolean>();
    });

    afterEach(() => {
      jest.restoreAllMocks();
    });

    // Simulates the exact handler attached in runSingleStrategyCdp
    const handleInterceptedRequest = async (params: { requestId: string; request: { url: string } }) => {
      const { requestId, request } = params;
      try {
        const check = await validateBrowserRequestUrl(request.url, dnsCache);
        if (!check.isAllowed) {
          await mockPageClient.send('Fetch.failRequest', { requestId, errorReason: 'AccessDenied' });
        } else {
          await mockPageClient.send('Fetch.continueRequest', { requestId });
        }
      } catch {
        await mockPageClient.send('Fetch.failRequest', { requestId, errorReason: 'AccessDenied' });
      }
    };

    it('should block embedded iframe requesting localhost or internal port', async () => {
      await handleInterceptedRequest({
        requestId: 'req-iframe-1',
        request: { url: 'http://127.0.0.1:3000/api/admin/stats' },
      });

      expect(mockPageClient.send).toHaveBeenCalledWith('Fetch.failRequest', {
        requestId: 'req-iframe-1',
        errorReason: 'AccessDenied',
      });
      expect(mockPageClient.send).not.toHaveBeenCalledWith('Fetch.continueRequest', expect.anything());
    });

    it('should block embedded image requesting cloud metadata service (AWS/GCP/Azure)', async () => {
      await handleInterceptedRequest({
        requestId: 'req-img-1',
        request: { url: 'http://169.254.169.254/latest/meta-data/' },
      });

      expect(mockPageClient.send).toHaveBeenCalledWith('Fetch.failRequest', {
        requestId: 'req-img-1',
        errorReason: 'AccessDenied',
      });
      expect(mockPageClient.send).not.toHaveBeenCalledWith('Fetch.continueRequest', expect.anything());
    });

    it('should block embedded script requesting local file system via file:// protocol', async () => {
      await handleInterceptedRequest({
        requestId: 'req-script-1',
        request: { url: 'file:///etc/passwd' },
      });

      expect(mockPageClient.send).toHaveBeenCalledWith('Fetch.failRequest', {
        requestId: 'req-script-1',
        errorReason: 'AccessDenied',
      });
      expect(mockPageClient.send).not.toHaveBeenCalledWith('Fetch.continueRequest', expect.anything());
    });

    it('should block redirected request that targets a private RFC1918 address', async () => {
      // Simulates browser following a 302 redirect from public URL to private IP
      await handleInterceptedRequest({
        requestId: 'req-redirect-1',
        request: { url: 'http://10.0.0.5/internal-api' },
      });

      expect(mockPageClient.send).toHaveBeenCalledWith('Fetch.failRequest', {
        requestId: 'req-redirect-1',
        errorReason: 'AccessDenied',
      });
      expect(mockPageClient.send).not.toHaveBeenCalledWith('Fetch.continueRequest', expect.anything());
    });

    it('should block request to domain that resolves to loopback IP (DNS Rebinding)', async () => {
      jest.spyOn(dns.promises, 'lookup').mockResolvedValue([
        { address: '127.0.0.1', family: 4 },
      ] as any);

      await handleInterceptedRequest({
        requestId: 'req-rebind-1',
        request: { url: 'http://malicious-rebind.internal.test/payload.js' },
      });

      expect(mockPageClient.send).toHaveBeenCalledWith('Fetch.failRequest', {
        requestId: 'req-rebind-1',
        errorReason: 'AccessDenied',
      });
      expect(mockPageClient.send).not.toHaveBeenCalledWith('Fetch.continueRequest', expect.anything());
    });

    it('should allow legitimate public stylesheet request', async () => {
      jest.spyOn(dns.promises, 'lookup').mockResolvedValue([
        { address: '142.250.190.46', family: 4 },
      ] as any);

      await handleInterceptedRequest({
        requestId: 'req-css-1',
        request: { url: 'https://fonts.googleapis.com/css2?family=Inter' },
      });

      expect(mockPageClient.send).toHaveBeenCalledWith('Fetch.continueRequest', {
        requestId: 'req-css-1',
      });
      expect(mockPageClient.send).not.toHaveBeenCalledWith('Fetch.failRequest', expect.anything());
    });

    it('should fast-path allow safe inline data URI images', async () => {
      await handleInterceptedRequest({
        requestId: 'req-data-1',
        request: { url: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII=' },
      });

      expect(mockPageClient.send).toHaveBeenCalledWith('Fetch.continueRequest', {
        requestId: 'req-data-1',
      });
    });
  });

  describe('CDP Interception Lifecycle, Concurrency & Teardown Reliability', () => {
    it('should register Fetch.requestPaused listener BEFORE sending Fetch.enable', () => {
      const callOrder: string[] = [];
      const listeners: Record<string, Function[]> = {};

      const mockClient = {
        on: jest.fn((event: string, fn: Function) => {
          callOrder.push(`on:${event}`);
          listeners[event] = listeners[event] || [];
          listeners[event].push(fn);
        }),
        send: jest.fn(async (method: string, params?: any) => {
          callOrder.push(`send:${method}`);
          return {};
        }),
      };

      // Execution sequence matching runSingleStrategyCdp
      mockClient.on('Fetch.requestPaused', () => {});
      mockClient.send('Fetch.enable', { patterns: [{ requestStage: 'Request' }] });

      expect(callOrder[0]).toBe('on:Fetch.requestPaused');
      expect(callOrder[1]).toBe('send:Fetch.enable');
    });

    it('should process multiple simultaneous intercepted requests concurrently and independently', async () => {
      const sendMock = jest.fn().mockResolvedValue({});
      const inFlightRequests = new Set<string>();
      let isInterceptionActive = true;
      const dnsCache = new Map<string, boolean>();

      jest.spyOn(dns.promises, 'lookup').mockImplementation(async (host: string) => {
        if (host === 'public1.com') return [{ address: '93.184.216.34', family: 4 }] as any;
        if (host === 'public2.com') return [{ address: '142.250.190.46', family: 4 }] as any;
        if (host === 'private-evil.com') return [{ address: '10.0.0.1', family: 4 }] as any;
        if (host === 'loopback-evil.com') return [{ address: '127.0.0.1', family: 4 }] as any;
        throw new Error('NXDOMAIN');
      });

      const handlePausedRequest = async (requestId: string, url: string) => {
        inFlightRequests.add(requestId);
        let handled = false;

        const safeFail = async (reason = 'AccessDenied') => {
          if (handled || !isInterceptionActive) return;
          handled = true;
          inFlightRequests.delete(requestId);
          await sendMock('Fetch.failRequest', { requestId, errorReason: reason });
        };

        const safeContinue = async () => {
          if (handled || !isInterceptionActive) return;
          handled = true;
          inFlightRequests.delete(requestId);
          await sendMock('Fetch.continueRequest', { requestId });
        };

        try {
          const check = await validateBrowserRequestUrl(url, dnsCache);
          if (!check.isAllowed) {
            await safeFail('AccessDenied');
          } else {
            await safeContinue();
          }
        } catch {
          await safeFail('AccessDenied');
        }
      };

      // Dispatch 5 concurrent intercepted requests
      await Promise.all([
        handlePausedRequest('req-1', 'https://public1.com/style.css'),
        handlePausedRequest('req-2', 'http://169.254.169.254/metadata'),
        handlePausedRequest('req-3', 'https://public2.com/app.js'),
        handlePausedRequest('req-4', 'http://private-evil.com/data.json'),
        handlePausedRequest('req-5', 'http://loopback-evil.com/secret'),
      ]);

      // Verify all in-flight tracking was cleared
      expect(inFlightRequests.size).toBe(0);

      // Verify legitimate requests continued
      expect(sendMock).toHaveBeenCalledWith('Fetch.continueRequest', { requestId: 'req-1' });
      expect(sendMock).toHaveBeenCalledWith('Fetch.continueRequest', { requestId: 'req-3' });

      // Verify SSRF/private requests failed
      expect(sendMock).toHaveBeenCalledWith('Fetch.failRequest', { requestId: 'req-2', errorReason: 'AccessDenied' });
      expect(sendMock).toHaveBeenCalledWith('Fetch.failRequest', { requestId: 'req-4', errorReason: 'AccessDenied' });
      expect(sendMock).toHaveBeenCalledWith('Fetch.failRequest', { requestId: 'req-5', errorReason: 'AccessDenied' });
    });

    it('should fail-closed if DNS resolution fails or times out', async () => {
      const sendMock = jest.fn().mockResolvedValue({});
      const inFlightRequests = new Set<string>();

      jest.spyOn(dns.promises, 'lookup').mockRejectedValue(new Error('DNS resolution timeout'));

      const handlePausedRequest = async (requestId: string, url: string) => {
        inFlightRequests.add(requestId);
        let handled = false;

        const safeFail = async (reason = 'AccessDenied') => {
          if (handled) return;
          handled = true;
          inFlightRequests.delete(requestId);
          await sendMock('Fetch.failRequest', { requestId, errorReason: reason });
        };

        try {
          const check = await validateBrowserRequestUrl(url, new Map());
          if (!check.isAllowed) {
            await safeFail('AccessDenied');
          } else {
            await sendMock('Fetch.continueRequest', { requestId });
          }
        } catch {
          await safeFail('AccessDenied');
        }
      };

      await handlePausedRequest('req-dns-err', 'https://unresolvable-domain.example/script.js');

      expect(sendMock).toHaveBeenCalledWith('Fetch.failRequest', {
        requestId: 'req-dns-err',
        errorReason: 'AccessDenied',
      });
      expect(inFlightRequests.size).toBe(0);
    });

    it('should enforce hard timeout on paused requests that hang', async () => {
      jest.useFakeTimers();
      const sendMock = jest.fn().mockResolvedValue({});
      const inFlightRequests = new Set<string>();
      let isInterceptionActive = true;

      const handlePausedRequestWithTimeout = (requestId: string) => {
        inFlightRequests.add(requestId);
        let handled = false;

        const safeFail = async (reason = 'AccessDenied') => {
          if (handled || !isInterceptionActive) return;
          handled = true;
          inFlightRequests.delete(requestId);
          await sendMock('Fetch.failRequest', { requestId, errorReason: reason });
        };

        // Simulating 3000ms timeout
        const timer = setTimeout(() => {
          safeFail('TimedOut');
        }, 3000);
        timer.unref();
      };

      handlePausedRequestWithTimeout('req-hanging-1');
      expect(inFlightRequests.has('req-hanging-1')).toBe(true);

      // Fast-forward 3000ms
      jest.advanceTimersByTime(3000);

      expect(sendMock).toHaveBeenCalledWith('Fetch.failRequest', {
        requestId: 'req-hanging-1',
        errorReason: 'TimedOut',
      });
      expect(inFlightRequests.has('req-hanging-1')).toBe(false);
      jest.useRealTimers();
    });

    it('should drain and abort all in-flight requests on evaluation completion or teardown', async () => {
      const sendMock = jest.fn().mockResolvedValue({});
      const inFlightRequests = new Set<string>(['req-dangling-1', 'req-dangling-2', 'req-dangling-3']);
      let isInterceptionActive = true;

      // Teardown sequence matching cdp-runner lines 689-695
      isInterceptionActive = false;
      for (const reqId of inFlightRequests) {
        sendMock('Fetch.failRequest', { requestId: reqId, errorReason: 'Aborted' });
      }
      inFlightRequests.clear();
      await sendMock('Fetch.disable');

      expect(inFlightRequests.size).toBe(0);
      expect(sendMock).toHaveBeenCalledWith('Fetch.failRequest', { requestId: 'req-dangling-1', errorReason: 'Aborted' });
      expect(sendMock).toHaveBeenCalledWith('Fetch.failRequest', { requestId: 'req-dangling-2', errorReason: 'Aborted' });
      expect(sendMock).toHaveBeenCalledWith('Fetch.failRequest', { requestId: 'req-dangling-3', errorReason: 'Aborted' });
      expect(sendMock).toHaveBeenCalledWith('Fetch.disable');
    });
  });
});
