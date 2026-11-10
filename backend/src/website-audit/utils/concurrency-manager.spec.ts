import { ChromiumConcurrencyManager } from './concurrency-manager';

describe('ChromiumConcurrencyManager Unit Tests', () => {
  let manager: ChromiumConcurrencyManager;

  beforeEach(() => {
    // Instantiate with maxConcurrency = 2, queueTimeoutMs = 500ms for fast testing
    manager = new ChromiumConcurrencyManager(2, 500);
  });

  afterEach(() => {
    manager.reset();
  });

  it('should allow up to maxConcurrency concurrent executions without queuing', async () => {
    expect(manager.stats.activeCount).toBe(0);
    expect(manager.stats.queuedCount).toBe(0);

    const release1 = await manager.acquire();
    expect(manager.stats.activeCount).toBe(1);
    expect(manager.stats.queuedCount).toBe(0);

    const release2 = await manager.acquire();
    expect(manager.stats.activeCount).toBe(2);
    expect(manager.stats.queuedCount).toBe(0);

    release1();
    expect(manager.stats.activeCount).toBe(1);

    release2();
    expect(manager.stats.activeCount).toBe(0);
  });

  it('should queue subsequent requests when capacity is full (activeCount == maxConcurrency)', async () => {
    const release1 = await manager.acquire();
    const release2 = await manager.acquire();

    let request3Acquired = false;
    const acquire3Promise = manager.acquire().then((rel) => {
      request3Acquired = true;
      return rel;
    });

    // Request 3 must be queued
    expect(manager.stats.activeCount).toBe(2);
    expect(manager.stats.queuedCount).toBe(1);
    expect(request3Acquired).toBe(false);

    // Release slot 1 -> Request 3 should now acquire the slot
    release1();
    const release3 = await acquire3Promise;
    expect(request3Acquired).toBe(true);
    expect(manager.stats.activeCount).toBe(2);
    expect(manager.stats.queuedCount).toBe(0);

    release2();
    release3();
    expect(manager.stats.activeCount).toBe(0);
  });

  it('should handle multiple queued requests in strict FIFO order', async () => {
    const release1 = await manager.acquire();
    const release2 = await manager.acquire();

    const order: number[] = [];

    const p3 = manager.acquire().then((rel) => {
      order.push(3);
      return rel;
    });
    const p4 = manager.acquire().then((rel) => {
      order.push(4);
      return rel;
    });

    expect(manager.stats.queuedCount).toBe(2);

    release1();
    const rel3 = await p3;
    expect(order).toEqual([3]);
    expect(manager.stats.queuedCount).toBe(1);

    release2();
    const rel4 = await p4;
    expect(order).toEqual([3, 4]);
    expect(manager.stats.queuedCount).toBe(0);

    rel3();
    rel4();
    expect(manager.stats.activeCount).toBe(0);
  });

  it('should release slot safely when an audit task encounters an exception', async () => {
    const runTaskWithSlot = async (shouldFail: boolean) => {
      const release = await manager.acquire();
      try {
        if (shouldFail) {
          throw new Error('Audit Chromium measurement crash');
        }
        return 'success';
      } finally {
        release();
      }
    };

    // Task 1 succeeds, Task 2 fails with exception
    await runTaskWithSlot(false);
    expect(manager.stats.activeCount).toBe(0);

    await expect(runTaskWithSlot(true)).rejects.toThrow('Audit Chromium measurement crash');
    expect(manager.stats.activeCount).toBe(0); // Slot must be safely released!
  });

  it('should reject with queue timeout when concurrency slots remain occupied', async () => {
    const shortTimeoutManager = new ChromiumConcurrencyManager(1, 100);

    const release1 = await shortTimeoutManager.acquire();

    // Second request should wait in queue and time out after 100ms
    await expect(shortTimeoutManager.acquire()).rejects.toThrow(
      'Audit concurrency queue timeout exceeded (100ms). Server capacity busy.'
    );

    expect(shortTimeoutManager.stats.queuedCount).toBe(0);
    release1();
    expect(shortTimeoutManager.stats.activeCount).toBe(0);
  });

  it('should guarantee competitor audits acquire and release slots sequentially', async () => {
    // Simulates an audit workflow where target URL and competitor URL run sequentially
    const runAuditWithCompetitor = async (auditName: string) => {
      // Phase 1: Target URL audit
      const releaseTarget = await manager.acquire();
      await new Promise((r) => setTimeout(r, 20));
      releaseTarget();

      // Phase 2: Competitor URL audit
      const releaseComp = await manager.acquire();
      await new Promise((r) => setTimeout(r, 20));
      releaseComp();

      return `${auditName} complete`;
    };

    // Run two audits in parallel
    const [resA, resB] = await Promise.all([
      runAuditWithCompetitor('Audit A'),
      runAuditWithCompetitor('Audit B'),
    ]);

    expect(resA).toBe('Audit A complete');
    expect(resB).toBe('Audit B complete');
    expect(manager.stats.activeCount).toBe(0);
    expect(manager.stats.queuedCount).toBe(0);
  });
});

