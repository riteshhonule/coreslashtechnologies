import { Module, OnModuleInit, Logger } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ThrottlerModule } from '@nestjs/throttler';
import * as path from 'path';

import appConfig from './config/app.config';
import databaseConfig from './config/database.config';
import swaggerConfig from './config/swagger.config';
import jwtConfig from './config/jwt.config';
import redisConfig from './config/redis.config';
import uploadConfig from '@core/config/upload.config';
import { DatabaseModule } from './database/database.module';
import { RedisModule } from '@core/redis/redis.module';
import { CacheModule } from '@core/cache/cache.module';
import { HealthModule } from './health/health.module';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { NotificationModule } from './modules/notifications/notification.module';
import { ensureDirectoriesExist } from '@core/helpers/file.helper';
import { UPLOAD_CONSTANTS } from '@core/constants/upload.constants';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig, databaseConfig, swaggerConfig, jwtConfig, redisConfig, uploadConfig],
    }),
    ThrottlerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: () => [
        {
          ttl: 60000, // 1 minute
          limit: 100, // 100 requests per minute
        },
      ],
    }),
    ServeStaticModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const uploadDest = configService.get<string>(
          'upload.destination',
          'storage/uploads',
        );
        const rootPath = path.isAbsolute(uploadDest)
          ? uploadDest
          : path.join(process.cwd(), uploadDest);

        return [
          {
            rootPath,
            serveRoot: '/uploads',
            serveStaticOptions: {
              index: false,
              fallthrough: false,
            },
          },
        ];
      },
    }),
    DatabaseModule,
    RedisModule,
    CacheModule,
    NotificationModule,
    HealthModule,
    AuthModule,
    UsersModule,
  ],
})
export class AppModule implements OnModuleInit {
  private readonly logger = new Logger(AppModule.name);

  constructor(private readonly configService: ConfigService) {}

  onModuleInit(): void {
    const uploadDest = this.configService.get<string>(
      'upload.destination',
      'storage/uploads',
    );
    this.logger.log(`Ensuring upload storage directories exist at: ${uploadDest}`);
    ensureDirectoriesExist(uploadDest, UPLOAD_CONSTANTS.UPLOAD_FOLDERS);
    this.logger.log('All 15 upload storage subfolders verified successfully.');
  }
}
