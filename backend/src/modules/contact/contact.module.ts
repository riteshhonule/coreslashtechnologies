import { Module } from '@nestjs/common';
import { DatabaseModule } from '@database/database.module';
import { RedisModule } from '@core/redis/redis.module';
import { CacheModule } from '@core/cache/cache.module';
import { NotificationModule } from '../notifications/notification.module';
import { ContactController } from './contact.controller';
import { ContactService } from './contact.service';

@Module({
  imports: [DatabaseModule, RedisModule, CacheModule, NotificationModule],
  controllers: [ContactController],
  providers: [ContactService],
  exports: [ContactService],
})
export class ContactModule {}
