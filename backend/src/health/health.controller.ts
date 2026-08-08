import { Controller, Get, Res, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Response } from 'express';
import { Public } from '@common/decorators/public.decorator';
import { PrismaService } from '@database/prisma.service';
import { RedisService } from '@core/redis/redis.service';

@ApiTags('Health')
@Controller('health')
export class HealthController {
  constructor(
    private readonly prisma: PrismaService,
    private readonly redisService: RedisService,
  ) {}

  @Public()
  @Get()
  @ApiOperation({ summary: 'Check API status and overall health' })
  @ApiResponse({
    status: 200,
    description: 'CoreSlash Backend Running successfully',
  })
  async checkHealth() {
    let dbStatus = 'down';
    try {
      await this.prisma.$queryRaw`SELECT 1`;
      dbStatus = 'up';
    } catch {
      dbStatus = 'down';
    }

    const redisHealthy = await this.redisService.isHealthy();
    const redisStatus = redisHealthy ? 'up' : 'down';

    return {
      success: dbStatus === 'up',
      message: dbStatus === 'up' ? 'CoreSlash Backend Operational' : 'CoreSlash Backend Degraded',
      timestamp: new Date().toISOString(),
      version: '1.0.0',
      services: {
        database: { status: dbStatus },
        redis: { status: redisStatus },
      },
    };
  }

  @Public()
  @Get('liveness')
  @ApiOperation({ summary: 'Liveness probe (process is running)' })
  getLiveness() {
    return {
      status: 'up',
      liveness: true,
      timestamp: new Date().toISOString(),
    };
  }

  @Public()
  @Get('readiness')
  @ApiOperation({ summary: 'Readiness probe (ready to process traffic)' })
  async getReadiness(@Res() res: Response) {
    let dbStatus = 'down';
    try {
      await this.prisma.$queryRaw`SELECT 1`;
      dbStatus = 'up';
    } catch {
      dbStatus = 'down';
    }

    const redisHealthy = await this.redisService.isHealthy();
    const isReady = dbStatus === 'up';

    const statusCode = isReady ? HttpStatus.OK : HttpStatus.SERVICE_UNAVAILABLE;

    return res.status(statusCode).json({
      status: isReady ? 'ready' : 'not_ready',
      readiness: isReady,
      services: {
        database: { status: dbStatus },
        redis: { status: redisHealthy ? 'up' : 'down' },
      },
      timestamp: new Date().toISOString(),
    });
  }
}
