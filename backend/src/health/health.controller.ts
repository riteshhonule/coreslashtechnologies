import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
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
  @ApiOperation({ summary: 'Check API status and health' })
  @ApiResponse({
    status: 200,
    description: 'CoreSlash Backend Running successfully',
    schema: {
      type: 'object',
      properties: {
        success: { type: 'boolean', example: true },
        message: { type: 'string', example: 'CoreSlash Backend Operational' },
        timestamp: { type: 'string', example: '2026-08-08T00:00:00.000Z' },
        version: { type: 'string', example: '1.0.0' },
        services: {
          type: 'object',
          properties: {
            database: {
              type: 'object',
              properties: { status: { type: 'string', example: 'up' } },
            },
            redis: {
              type: 'object',
              properties: { status: { type: 'string', example: 'up' } },
            },
          },
        },
      },
    },
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
}
