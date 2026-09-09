import { fetchSafeWithSsrfRedirects } from './ssrf-validator';

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
