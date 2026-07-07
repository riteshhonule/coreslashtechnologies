import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { AllExceptionsFilter } from './common/filters/all-exceptions.filter';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import * as fs from 'fs';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // Ensure upload directories exist
  const uploadResumesDir = join(__dirname, '..', 'uploads', 'resumes');
  if (!fs.existsSync(uploadResumesDir)) {
    fs.mkdirSync(uploadResumesDir, { recursive: true });
  }

  app.useStaticAssets(join(__dirname, '..', 'uploads'), {
    prefix: '/uploads/',
  });

  const configService = app.get(ConfigService);
  const corsOriginsStr =
    configService.get<string>('CORS_ORIGINS') ||
    'https://coreslashtechnologies.com,https://www.coreslashtechnologies.com';
  const origins = corsOriginsStr
    .split(',')
    .map((o) => o.trim().replace(/^['"]|['"]$/g, ''));

  app.enableCors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      const cleanOrigin = origin.toLowerCase().trim().replace(/\/+$/, '');
      const isAllowed =
        cleanOrigin.includes('coreslashtechnologies.com') ||
        /^https?:\/\/(localhost|127\.0\.0\.1|10\.\d+\.\d+\.\d+|192\.168\.\d+\.\d+|172\.(1[6-9]|2\d|3[0-1])\.\d+\.\d+)(:\d+)?$/.test(cleanOrigin) ||
        origins.some(o => o.toLowerCase().trim().replace(/\/+$/, '') === cleanOrigin);

      if (isAllowed) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
  });

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  app.useGlobalFilters(new AllExceptionsFilter());
  app.setGlobalPrefix('api');

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
