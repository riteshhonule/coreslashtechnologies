import { Module } from '@nestjs/common';
import { DatabaseModule } from '@database/database.module';
import { RedisModule } from '@core/redis/redis.module';
import { CacheModule } from '@core/cache/cache.module';
import { SeoController } from './seo.controller';
import { SeoService } from './seo.service';

@Module({
  imports: [DatabaseModule, RedisModule, CacheModule],
  controllers: [SeoController],
  providers: [SeoService],
  exports: [SeoService],
})
export class SeoModule {}
