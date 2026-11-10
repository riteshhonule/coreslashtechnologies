import { Logger } from '@nestjs/common';

export interface ConcurrencyStats {
  activeCount: number;
  queuedCount: number;
  maxConcurrency: number;
}

interface QueuedItem {
  resolve: (release: () => void) => void;
  reject: (err: Error) => void;
  timer: NodeJS.Timeout;
}

/**
 * ChromiumConcurrencyManager
 *
 * Implements a bounded concurrency queue for headless Chromium instances.
 * Guarantees that at most `maxConcurrency` browser instances can run simultaneously,
 * preventing CPU starvation and Out-Of-Memory (OOM) crashes.
 *
 * Incoming requests exceeding capacity are queued FIFO with a configurable timeout.
 */
export class ChromiumConcurrencyManager {
  private readonly logger = new Logger(ChromiumConcurrencyManager.name);
  private activeCount = 0;
  private readonly queue: QueuedItem[] = [];
  private readonly maxConcurrency: number;
  private readonly queueTimeoutMs: number;

  constructor(maxConcurrency?: number, queueTimeoutMs?: number) {
    const envConcurrency = parseInt(process.env.AUDIT_MAX_CONCURRENT_BROWSERS || '2', 10);
    this.maxConcurrency = maxConcurrency ?? (isNaN(envConcurrency) || envConcurrency < 1 ? 2 : envConcurrency);

    const envTimeout = parseInt(process.env.AUDIT_QUEUE_TIMEOUT_MS || '60000', 10);
    this.queueTimeoutMs = queueTimeoutMs ?? (isNaN(envTimeout) || envTimeout < 1000 ? 60000 : envTimeout);
  }

  /**
   * Acquires an execution slot for Chromium.
   * Resolves with an idempotent `release()` function that must be called in a finally block.
   */
  async acquire(): Promise<() => void> {
    if (this.activeCount < this.maxConcurrency) {
      this.activeCount++;
      let released = false;
      return () => {
        if (!released) {
          released = true;
          this.release();
        }
      };
    }

    this.logger.log(`Chromium concurrency capacity reached (${this.activeCount}/${this.maxConcurrency}). Queuing request (Queue depth: ${this.queue.length + 1})...`);

    return new Promise((resolve, reject) => {
      const timer = setTimeout(() => {
        const idx = this.queue.findIndex(item => item.timer === timer);
        if (idx !== -1) {
          this.queue.splice(idx, 1);
        }
        reject(new Error(`Audit concurrency queue timeout exceeded (${this.queueTimeoutMs}ms). Server capacity busy.`));
      }, this.queueTimeoutMs);
      if (typeof timer.unref === 'function') {
        timer.unref();
      }

      this.queue.push({
        resolve: (releaseFn) => {
          clearTimeout(timer);
          resolve(releaseFn);
        },
        reject: (err) => {
          clearTimeout(timer);
          reject(err);
        },
        timer,
      });
    });
  }

  private release(): void {
    this.activeCount = Math.max(0, this.activeCount - 1);

    if (this.queue.length > 0 && this.activeCount < this.maxConcurrency) {
      this.activeCount++;
      const next = this.queue.shift();
      if (next) {
        let released = false;
        const releaseFn = () => {
          if (!released) {
            released = true;
            this.release();
          }
        };
        next.resolve(releaseFn);
      }
    }
  }

  get stats(): ConcurrencyStats {
    return {
      activeCount: this.activeCount,
      queuedCount: this.queue.length,
      maxConcurrency: this.maxConcurrency,
    };
  }

  /**
   * Testing helper to reset state between test cases
   */
  reset(): void {
    for (const item of this.queue) {
      clearTimeout(item.timer);
    }
    this.queue.length = 0;
    this.activeCount = 0;
  }
}

/** Global singleton instance used by the audit service */
export const chromiumConcurrencyManager = new ChromiumConcurrencyManager();
