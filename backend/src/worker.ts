import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { NotificationModule } from './modules/notifications/notification.module';

async function bootstrapWorker() {
  const logger = new Logger('NotificationWorker');
  logger.log('Starting standalone CoreSlash Notification Worker...');
  const app = await NestFactory.createApplicationContext(NotificationModule);
  app.enableShutdownHooks();
  logger.log('CoreSlash Notification Worker operational and listening for BullMQ jobs.');
}

bootstrapWorker().catch((err) => {
  console.error('Notification Worker fatal error:', err);
  process.exit(1);
});
