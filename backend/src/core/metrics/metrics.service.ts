import { Injectable, Logger } from '@nestjs/common';

export interface IMetricsSnapshot {
  http: {
    totalRequests: number;
    errors4xx: number;
    errors5xx: number;
    avgLatencyMs: number;
    maxLatencyMs: number;
  };
  auth: {
    loginsSuccess: number;
    loginsFailed: number;
  };
  cache: {
    hits: number;
    misses: number;
    redisFailures: number;
  };
  queue: {
    jobsCreated: number;
    jobsCompleted: number;
    jobsFailed: number;
    notificationFailures: number;
  };
  uptimeSeconds: number;
  timestamp: string;
}

@Injectable()
export class MetricsService {
  private readonly logger = new Logger(MetricsService.name);
  private readonly startTime = Date.now();

  private totalRequests = 0;
  private errors4xx = 0;
  private errors5xx = 0;
  private totalLatencySumMs = 0;
  private maxLatencyMs = 0;

  private loginsSuccess = 0;
  private loginsFailed = 0;

  private cacheHits = 0;
  private cacheMisses = 0;
  private redisFailures = 0;

  private jobsCreated = 0;
  private jobsCompleted = 0;
  private jobsFailed = 0;
  private notificationFailures = 0;

  // HTTP Request metrics recorder
  recordHttpRequest(statusCode: number, durationMs: number) {
    this.totalRequests++;
    this.totalLatencySumMs += durationMs;
    if (durationMs > this.maxLatencyMs) {
      this.maxLatencyMs = durationMs;
    }

    if (statusCode >= 400 && statusCode < 500) {
      this.errors4xx++;
    } else if (statusCode >= 500) {
      this.errors5xx++;
    }

    // WARN threshold on slow requests (> 1000ms)
    if (durationMs > 1000) {
      this.logger.warn(`Slow Request Detected: ${durationMs}ms (Status: ${statusCode})`);
    }
  }

  recordAuthLogin(success: boolean) {
    if (success) {
      this.loginsSuccess++;
    } else {
      this.loginsFailed++;
    }
  }

  recordCacheHit() {
    this.cacheHits++;
  }

  recordCacheMiss() {
    this.cacheMisses++;
  }

  recordRedisFailure() {
    this.redisFailures++;
  }

  recordJobCreated() {
    this.jobsCreated++;
  }

  recordJobCompleted() {
    this.jobsCompleted++;
  }

  recordJobFailed() {
    this.jobsFailed++;
  }

  recordNotificationFailure() {
    this.notificationFailures++;
  }

  getSnapshot(): IMetricsSnapshot {
    const avgLatencyMs =
      this.totalRequests > 0
        ? Math.round(this.totalLatencySumMs / this.totalRequests)
        : 0;

    return {
      http: {
        totalRequests: this.totalRequests,
        errors4xx: this.errors4xx,
        errors5xx: this.errors5xx,
        avgLatencyMs,
        maxLatencyMs: this.maxLatencyMs,
      },
      auth: {
        loginsSuccess: this.loginsSuccess,
        loginsFailed: this.loginsFailed,
      },
      cache: {
        hits: this.cacheHits,
        misses: this.cacheMisses,
        redisFailures: this.redisFailures,
      },
      queue: {
        jobsCreated: this.jobsCreated,
        jobsCompleted: this.jobsCompleted,
        jobsFailed: this.jobsFailed,
        notificationFailures: this.notificationFailures,
      },
      uptimeSeconds: Math.floor((Date.now() - this.startTime) / 1000),
      timestamp: new Date().toISOString(),
    };
  }
}
