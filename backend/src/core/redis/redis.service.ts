import {
  Injectable,
  OnModuleInit,
  OnModuleDestroy,
  Logger,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Redis, { RedisOptions } from 'ioredis';

@Injectable()
export class RedisService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(RedisService.name);
  private client: Redis | null = null;
  private isConnected = false;
  private connectionAttempts = 0;
  private readonly maxRetries: number;
  private readonly keyPrefix: string;

  constructor(private readonly configService: ConfigService) {
    this.maxRetries = this.configService.get<number>('redis.maxRetries', 3);
    this.keyPrefix = this.configService.get<string>('redis.keyPrefix', 'coreslash:');
  }

  onModuleInit(): void {
    this.initRedisClient();
  }

  async onModuleDestroy(): Promise<void> {
    if (this.client) {
      this.logger.log('Closing Redis connection gracefully...');
      try {
        await this.client.quit();
        this.logger.log('Redis connection closed.');
      } catch (err) {
        const errorMsg = err instanceof Error ? err.message : String(err);
        this.logger.warn(`Error while closing Redis connection: ${errorMsg}`);
        this.client.disconnect();
      }
      this.client = null;
      this.isConnected = false;
    }
  }

  private initRedisClient(): void {
    const redisUrl = this.configService.get<string>('redis.url');
    const host = this.configService.get<string>('redis.host', 'localhost');
    const port = this.configService.get<number>('redis.port', 6379);
    const password = this.configService.get<string>('redis.password');
    const db = this.configService.get<number>('redis.db', 0);
    const connectTimeout = this.configService.get<number>('redis.connectTimeout', 10000);

    const options: RedisOptions = {
      connectTimeout,
      lazyConnect: true,
      maxRetriesPerRequest: null, // Required by BullMQ & safe operation
      retryStrategy: (times: number) => {
        this.connectionAttempts = times;
        if (times > this.maxRetries) {
          this.logger.warn(
            `Redis retry limit of ${this.maxRetries} reached. Stopping automatic retries. Degraded mode active.`,
          );
          return null; // Stop reconnecting automatically
        }
        const delay = Math.min(times * 1000, 5000);
        this.logger.warn(`Redis connection retry attempt #${times} in ${delay}ms...`);
        return delay;
      },
    };

    if (password) {
      options.password = password;
    }

    if (redisUrl) {
      this.logger.log('Initializing Redis client with connection URL');
      this.client = new Redis(redisUrl, options);
    } else {
      this.logger.log(`Initializing Redis client at ${host}:${port} (DB ${db})`);
      this.client = new Redis({
        ...options,
        host,
        port,
        db,
      });
    }

    this.client.on('connect', () => {
      this.logger.log('Redis client: TCP connection established.');
    });

    this.client.on('ready', () => {
      this.isConnected = true;
      this.connectionAttempts = 0;
      this.logger.log('Redis client: Ready to receive commands.');
    });

    this.client.on('error', (err: Error) => {
      this.isConnected = false;
      this.logger.warn(`Redis connection error: ${err.message}`);
    });

    this.client.on('close', () => {
      this.isConnected = false;
      this.logger.warn('Redis connection closed.');
    });

    this.client.on('reconnecting', () => {
      this.logger.log('Redis client: Attempting to reconnect...');
    });

    this.client.on('end', () => {
      this.isConnected = false;
      this.logger.warn('Redis connection ended.');
    });

    // Initiate connection asynchronously without crashing app on startup
    this.client.connect().catch((err: Error) => {
      this.isConnected = false;
      this.logger.warn(`Initial Redis connection failed: ${err.message}. Operating in degraded mode.`);
    });
  }

  /**
   * Return shared underlying ioredis client instance.
   */
  public getClient(): Redis | null {
    return this.client;
  }

  /**
   * Active health check using Redis PING command.
   */
  public async isHealthy(): Promise<boolean> {
    if (!this.client || !this.isConnected) {
      return false;
    }
    try {
      const response = await this.client.ping();
      return response === 'PONG';
    } catch {
      return false;
    }
  }

  /**
   * Retrieve a raw string value by key.
   */
  public async get(key: string): Promise<string | null> {
    if (!this.client || !this.isConnected) {
      return null;
    }
    try {
      return await this.client.get(key);
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      this.logger.warn(`Redis GET failed for key "${key}": ${msg}`);
      return null;
    }
  }

  /**
   * Store a raw string value with optional TTL (seconds).
   */
  public async set(key: string, value: string, ttlSeconds?: number): Promise<void> {
    if (!this.client || !this.isConnected) {
      return;
    }
    try {
      if (ttlSeconds && ttlSeconds > 0) {
        await this.client.set(key, value, 'EX', ttlSeconds);
      } else {
        await this.client.set(key, value);
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      this.logger.warn(`Redis SET failed for key "${key}": ${msg}`);
    }
  }

  /**
   * Store a raw string value with required TTL (seconds).
   */
  public async setWithTTL(key: string, value: string, ttlSeconds: number): Promise<void> {
    await this.set(key, value, ttlSeconds);
  }

  /**
   * Delete a key.
   */
  public async del(key: string): Promise<number> {
    if (!this.client || !this.isConnected) {
      return 0;
    }
    try {
      return await this.client.del(key);
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      this.logger.warn(`Redis DEL failed for key "${key}": ${msg}`);
      return 0;
    }
  }

  /**
   * Check if a key exists.
   */
  public async exists(key: string): Promise<boolean> {
    if (!this.client || !this.isConnected) {
      return false;
    }
    try {
      const count = await this.client.exists(key);
      return count > 0;
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      this.logger.warn(`Redis EXISTS failed for key "${key}": ${msg}`);
      return false;
    }
  }

  /**
   * Set TTL on key in seconds.
   */
  public async expire(key: string, ttlSeconds: number): Promise<boolean> {
    if (!this.client || !this.isConnected) {
      return false;
    }
    try {
      const result = await this.client.expire(key, ttlSeconds);
      return result === 1;
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      this.logger.warn(`Redis EXPIRE failed for key "${key}": ${msg}`);
      return false;
    }
  }

  /**
   * Get remaining TTL for key in seconds (-1 = no TTL, -2 = key not found).
   */
  public async ttl(key: string): Promise<number> {
    if (!this.client || !this.isConnected) {
      return -2;
    }
    try {
      return await this.client.ttl(key);
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      this.logger.warn(`Redis TTL failed for key "${key}": ${msg}`);
      return -2;
    }
  }

  /**
   * Safe pattern deletion using Redis SCAN cursor to prevent blocking event loop.
   */
  public async deleteByPattern(pattern: string): Promise<number> {
    if (!this.client || !this.isConnected) {
      return 0;
    }

    // Safety check: Require pattern to have a valid namespace or non-empty string
    if (!pattern || pattern.trim() === '*' || pattern.trim() === '') {
      this.logger.warn('Redis deleteByPattern rejected dangerous empty or universal wildcard pattern.');
      return 0;
    }

    let totalDeleted = 0;
    let cursor = '0';

    try {
      do {
        // SCAN returns [nextCursor, keys]
        const reply = await this.client.scan(cursor, 'MATCH', pattern, 'COUNT', 100);
        cursor = reply[0];
        const keys = reply[1];

        if (keys.length > 0) {
          // ioredis automatically prepends keyPrefix, but SCAN returns keys with prefix included when keyPrefix option is set on Redis instance.
          // Note: when ioredis has keyPrefix set, client.del(key) will attach keyPrefix again if we pass full prefixed key.
          // Strip prefix if present before calling del() on client instance.
          const keysToDelete = keys.map((k) =>
            this.keyPrefix && k.startsWith(this.keyPrefix) ? k.slice(this.keyPrefix.length) : k,
          );
          const count = await this.client.del(...keysToDelete);
          totalDeleted += count;
        }
      } while (cursor !== '0');

      return totalDeleted;
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      this.logger.warn(`Redis deleteByPattern failed for pattern "${pattern}": ${msg}`);
      return totalDeleted;
    }
  }

  /**
   * Higher-level helper: get or execute factory and store.
   */
  public async getOrSet<T>(
    key: string,
    factory: () => Promise<T>,
    ttlSeconds?: number,
  ): Promise<T> {
    const cachedStr = await this.get(key);
    if (cachedStr !== null) {
      try {
        return JSON.parse(cachedStr) as T;
      } catch (err) {
        this.logger.warn(`Failed to parse JSON cache for key "${key}". Re-fetching from source.`);
      }
    }

    const freshData = await factory();

    if (freshData !== undefined && freshData !== null) {
      try {
        const serialized = JSON.stringify(freshData);
        await this.set(key, serialized, ttlSeconds);
      } catch (err) {
        const msg = err instanceof Error ? err.message : String(err);
        this.logger.warn(`Failed to serialize data for key "${key}": ${msg}`);
      }
    }

    return freshData;
  }
}
