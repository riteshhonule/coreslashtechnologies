import { Injectable, Logger } from '@nestjs/common';
import { RedisService } from '../redis/redis.service';

@Injectable()
export class CacheService {
  private readonly logger = new Logger(CacheService.name);

  constructor(private readonly redisService: RedisService) {}

  /**
   * Type-safe cache GET. Returns parsed value or null on miss/error.
   */
  async get<T>(key: string): Promise<T | null> {
    try {
      const raw = await this.redisService.get(key);
      if (raw === null) {
        return null;
      }
      return JSON.parse(raw) as T;
    } catch (err) {
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
      const msg = err instanceof Error ? err.message : String(err);
      this.logger.warn(`Cache serialization error for key "${key}": ${msg}`);
    }
  }

  /**
   * Get cached item or compute & cache value using factory.
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

    // Cache Miss or Error: Execute factory loader once
    const result = await factory();

    if (result !== undefined && result !== null) {
      await this.set<T>(key, result, ttlSeconds);
    }

    return result;
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
