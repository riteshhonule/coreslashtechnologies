import { Module } from '@nestjs/common';
import { DatabaseModule } from '@database/database.module';
import { RedisModule } from '@core/redis/redis.module';
import { CacheModule } from '@core/cache/cache.module';
import { PortfolioController } from './portfolio.controller';
import { PortfolioService } from './portfolio.service';

@Module({
  imports: [DatabaseModule, RedisModule, CacheModule],
  controllers: [PortfolioController],
  providers: [PortfolioService],
  exports: [PortfolioService],
})
export class PortfolioModule {}
