import { Injectable, Logger, Optional } from '@nestjs/common';
import { RedisService } from '../redis/redis.service';
import { MetricsService } from '../metrics/metrics.service';

@Injectable()
export class CacheService {
  private readonly logger = new Logger(CacheService.name);
  private readonly inFlight = new Map<string, Promise<any>>();

  constructor(
    private readonly redisService: RedisService,
    @Optional() private readonly metricsService?: MetricsService,
  ) {}

  /**
   * Type-safe cache GET. Returns parsed value or null on miss/error.
   */
  async get<T>(key: string): Promise<T | null> {
    try {
      const raw = await this.redisService.get(key);
      if (raw === null) {
        if (this.metricsService) this.metricsService.recordCacheMiss();
        return null;
      }
      if (this.metricsService) this.metricsService.recordCacheHit();
      return JSON.parse(raw) as T;
    } catch (err) {
      if (this.metricsService) this.metricsService.recordRedisFailure();
      const msg = err instanceof Error ? err.message : String(err);
      this.logger.warn(`Cache deserialization error for key "${key}": ${msg}`);
      return null;
    }
  }

  /**
   * Type-safe cache SET. Stores JSON stringified value with optional TTL.
   */
  async set<T>(key: string, value: T, ttlSeconds?: number): Promise<void> {
    if (value === undefined || value === null) {
      return;
    }
    try {
      const serialized = JSON.stringify(value);
      await this.redisService.set(key, serialized, ttlSeconds);
    } catch (err) {
      if (this.metricsService) this.metricsService.recordRedisFailure();
      const msg = err instanceof Error ? err.message : String(err);
      this.logger.warn(`Cache serialization error for key "${key}": ${msg}`);
    }
  }

  /**
   * Get cached item or compute & cache value using factory with single-flight stampede protection.
   */
  async getOrSet<T>(
    key: string,
    factory: () => Promise<T>,
    ttlSeconds?: number,
  ): Promise<T> {
    const cached = await this.get<T>(key);
    if (cached !== null) {
      return cached;
    }

    // Cache Stampede Protection: Single-Flight promise execution for identical concurrent cache misses
    if (this.inFlight.has(key)) {
      return this.inFlight.get(key) as Promise<T>;
    }

    const promise = (async () => {
      try {
        const result = await factory();
        if (result !== undefined && result !== null) {
          await this.set<T>(key, result, ttlSeconds);
        }
        return result;
      } finally {
        this.inFlight.delete(key);
      }
    })();

    this.inFlight.set(key, promise);
    return promise;
  }

  /**
   * Delete single cached key.
   */
  async delete(key: string): Promise<void> {
    await this.redisService.del(key);
  }

  /**
   * Delete multiple cached keys.
   */
  async deleteMany(keys: string[]): Promise<void> {
    if (!keys || keys.length === 0) {
      return;
    }
    for (const key of keys) {
      await this.redisService.del(key);
    }
  }

  /**
   * Invalidate cached keys matching pattern safely using SCAN.
   */
  async invalidate(pattern: string): Promise<void> {
    await this.redisService.deleteByPattern(pattern);
  }
}
