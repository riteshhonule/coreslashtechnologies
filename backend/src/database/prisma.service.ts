import {
  Injectable,
  OnModuleInit,
  OnModuleDestroy,
  Logger,
} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  private readonly logger = new Logger(PrismaService.name);

  constructor() {
    super({
      log:
        process.env.NODE_ENV === 'development'
          ? ['query', 'info', 'warn', 'error']
          : ['error'],
    });
  }

  async onModuleInit(): Promise<void> {
    this.logger.log('Connecting to PostgreSQL database via Prisma...');
    try {
      await this.$connect();
      // Execute a ping query to verify database connectivity
      await this.$queryRaw`SELECT 1`;
      this.logger.log('PostgreSQL database connection successfully verified.');
    } catch (error) {
      this.logger.error(
        `CRITICAL: Failed to connect to PostgreSQL database! Reason: ${(error as Error).message}`,
      );
      // Fail fast as requested
      throw new Error(
        `Database Connection Failed: Unable to establish PostgreSQL connection via Prisma. ${(error as Error).message}`,
      );
    }
  }

  async onModuleDestroy(): Promise<void> {
    this.logger.log('Disconnecting from PostgreSQL database...');
    await this.$disconnect();
  }
}
