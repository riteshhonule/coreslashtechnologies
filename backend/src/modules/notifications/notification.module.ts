import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { BullModule } from '@nestjs/bullmq';
import { DatabaseModule } from '@database/database.module';
import { RedisModule } from '@core/redis/redis.module';
import { NotificationService } from './notification.service';
import { NotificationProcessor } from './processors/notification.processor';
import { EmailProvider } from './providers/email.provider';

@Module({
  imports: [
    DatabaseModule,
    RedisModule,
    ConfigModule,
    BullModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const url = configService.get<string>('redis.url');
        const host = configService.get<string>('redis.host', 'localhost');
        const port = configService.get<number>('redis.port', 6379);
        const password = configService.get<string>('redis.password');
        const db = configService.get<number>('redis.db', 0);
        const keyPrefix = configService.get<string>('redis.keyPrefix', 'coreslash:');

        if (url) {
          return {
            connection: {
              url,
              keyPrefix,
            },
          };
        }

        return {
          connection: {
            host,
            port,
            password: password || undefined,
            db,
            keyPrefix,
          },
        };
      },
    }),
    BullModule.registerQueue({
      name: 'notifications',
    }),
  ],
  providers: [NotificationService, EmailProvider, NotificationProcessor],
  exports: [NotificationService, EmailProvider],
})
export class NotificationModule {}
