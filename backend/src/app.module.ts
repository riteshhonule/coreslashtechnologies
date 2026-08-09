import { Module, NestModule, MiddlewareConsumer, OnModuleInit, Logger } from '@nestjs/common';
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
import { MetricsModule } from '@core/metrics/metrics.module';
import { HealthModule } from './health/health.module';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { NotificationModule } from './modules/notifications/notification.module';
import { UploadsModule } from './modules/uploads/uploads.module';
import { SettingsModule } from './modules/settings/settings.module';
import { ServicesModule } from './modules/services/services.module';
import { BlogCategoriesModule } from './modules/blog-categories/blog-categories.module';
import { BlogsModule } from './modules/blogs/blogs.module';
import { PortfolioModule } from './modules/portfolio/portfolio.module';
import { FaqModule } from './modules/faq/faq.module';
import { CareersModule } from './modules/careers/careers.module';
import { ContactModule } from './modules/contact/contact.module';
import { NewsletterModule } from './modules/newsletter/newsletter.module';
import { SeoModule } from './modules/seo/seo.module';
import { DashboardModule } from './modules/dashboard/dashboard.module';
import { RequestIdMiddleware } from '@common/middleware/request-id.middleware';
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
    MetricsModule,
    NotificationModule,
    HealthModule,
    AuthModule,
    UsersModule,
    UploadsModule,
    SettingsModule,
    ServicesModule,
    BlogCategoriesModule,
    BlogsModule,
    PortfolioModule,
    FaqModule,
    CareersModule,
    ContactModule,
    NewsletterModule,
    SeoModule,
    DashboardModule,
  ],
})
export class AppModule implements NestModule, OnModuleInit {
  private readonly logger = new Logger(AppModule.name);

  constructor(private readonly configService: ConfigService) {}

  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(RequestIdMiddleware).forRoutes('*');
  }

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
