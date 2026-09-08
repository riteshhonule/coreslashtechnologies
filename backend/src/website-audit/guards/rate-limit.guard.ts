import { CanActivate, ExecutionContext, Injectable, HttpException, HttpStatus } from '@nestjs/common';
import type { Request } from 'express';

interface IpRateRecord {
  count: number;
  resetTime: number;
}

@Injectable()
export class AuditRateLimitGuard implements CanActivate {
  private readonly requestsMap = new Map<string, IpRateRecord>();
  private readonly maxRequests = 5; // Max 5 audit creations
  private readonly windowMs = 15 * 60 * 1000; // 15-minute fixed window

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();
    
    // Only rate limit POST requests for audit creation
    if (request.method !== 'POST') {
      return true;
    }

    const ip = this.getClientIp(request);
    const now = Date.now();

    let record = this.requestsMap.get(ip);
    if (!record || now > record.resetTime) {
      record = { count: 0, resetTime: now + this.windowMs };
    }

    record.count += 1;
    this.requestsMap.set(ip, record);

    // Periodic cleanup of expired entries
    if (this.requestsMap.size > 1000) {
      this.cleanup(now);
    }

    if (record.count > this.maxRequests) {
      const retryAfterSeconds = Math.ceil((record.resetTime - now) / 1000);
      throw new HttpException(
        {
          statusCode: HttpStatus.TOO_MANY_REQUESTS,
          message: `Too many audit creation requests from this IP. Please try again in ${retryAfterSeconds} seconds.`,
          error: 'Too Many Requests',
        },
        HttpStatus.TOO_MANY_REQUESTS
      );
    }

    return true;
  }

  private getClientIp(req: Request): string {
    // Rely on Express framework request IP resolution (configured via app trust proxy settings)
    // with fallback to socket remoteAddress. Avoid unvalidated manual parsing of client headers.
    return req.ip || req.socket?.remoteAddress || '127.0.0.1';
  }

  private cleanup(now: number): void {
    for (const [ip, record] of this.requestsMap.entries()) {
      if (now > record.resetTime) {
        this.requestsMap.delete(ip);
      }
    }
  }
}
