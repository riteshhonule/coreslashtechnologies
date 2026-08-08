import {
  Injectable,
  Logger,
  ServiceUnavailableException,
} from '@nestjs/common';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';
import { ActivityStatus } from '@prisma/client';
import { PrismaService } from '@database/prisma.service';
import { RedisService } from '@core/redis/redis.service';
import { INotificationPayload, INotificationJob } from './interfaces/notification.interface';

@Injectable()
export class NotificationService {
  private readonly logger = new Logger(NotificationService.name);

  constructor(
    @InjectQueue('notifications') private readonly notificationQueue: Queue,
    private readonly redisService: RedisService,
    private readonly prisma: PrismaService,
  ) {}

  /**
   * Queue a notification for background worker execution with strict failure reporting & idempotency.
   */
  async queueNotification(
    payload: INotificationPayload,
  ): Promise<{ success: boolean; jobId: string }> {
    // 1. Verify Redis Infrastructure Availability
    const isRedisUp = await this.redisService.isHealthy();
    if (!isRedisUp) {
      this.logger.error(
        `Cannot queue notification type "${payload.type}" for "${payload.recipient}": Redis queue infrastructure is offline.`,
      );
      throw new ServiceUnavailableException(
        'Notification queue infrastructure is currently unavailable. Request cannot be queued.',
      );
    }

    // 2. Build Idempotency Job ID
    const jobId = payload.eventId
      ? `notification:${payload.type}:${payload.userId || payload.recipient}:${payload.eventId}`
      : `notification:${payload.type}:${payload.recipient}:${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;

    const jobData: INotificationJob = {
      payload,
      attempt: 1,
      timestamp: new Date().toISOString(),
    };

    try {
      // 3. Enqueue job into BullMQ with exponential backoff & max attempts
      const job = await this.notificationQueue.add('send-notification', jobData, {
        jobId,
        attempts: 3,
        backoff: {
          type: 'exponential',
          delay: 1000, // 1s, 5s, 30s
        },
        removeOnComplete: { age: 3600, count: 1000 }, // Prevent unlimited queue growth
        removeOnFail: { age: 86400, count: 5000 },
      });

      this.logger.log(
        `Successfully queued notification job [ID: ${job.id}] for recipient "${payload.recipient}" (Template: ${payload.template})`,
      );

      // 4. Log ActivityLog for successfully queued notification
      await this.prisma.activityLog.create({
        data: {
          userId: payload.userId || null,
          action: 'NOTIFICATION_QUEUED',
          module: 'NOTIFICATIONS',
          description: `Notification [${payload.type}] queued successfully for ${payload.recipient} (Job ID: ${job.id})`,
          status: ActivityStatus.SUCCESS,
        },
      });

      return {
        success: true,
        jobId: job.id ? String(job.id) : jobId,
      };
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      this.logger.error(`Failed to enqueue notification job: ${msg}`);
      throw new ServiceUnavailableException(
        `Failed to queue notification job: ${msg}`,
      );
    }
  }
}
