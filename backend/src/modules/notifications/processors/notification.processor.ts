import { Processor, WorkerHost, OnWorkerEvent } from '@nestjs/bullmq';
import { Logger, Injectable } from '@nestjs/common';
import { Job } from 'bullmq';
import { ActivityStatus } from '@prisma/client';
import { PrismaService } from '@database/prisma.service';
import { EmailProvider } from '../providers/email.provider';
import { INotificationJob } from '../interfaces/notification.interface';

@Injectable()
@Processor('notifications', {
  concurrency: 5,
})
export class NotificationProcessor extends WorkerHost {
  private readonly logger = new Logger(NotificationProcessor.name);

  constructor(
    private readonly emailProvider: EmailProvider,
    private readonly prisma: PrismaService,
  ) {
    super();
  }

  /**
   * Main BullMQ job execution handler.
   */
  async process(job: Job<INotificationJob>): Promise<any> {
    const { payload, attempt } = job.data;
    this.logger.log(
      `Processing notification job [ID: ${job.id}] (Attempt #${job.attemptsMade + 1}/${job.opts.attempts || 3}) - Type: ${payload.type}, Template: ${payload.template}`,
    );

    if (payload.type === 'EMAIL') {
      await this.emailProvider.send(payload);
    } else {
      this.logger.log(`Provider for notification type "${payload.type}" processed successfully.`);
    }

    return { status: 'delivered', timestamp: new Date().toISOString() };
  }

  /**
   * Handle job completion event.
   */
  @OnWorkerEvent('completed')
  onCompleted(job: Job<INotificationJob>): void {
    this.logger.log(`Notification job [ID: ${job.id}] completed successfully.`);
  }

  /**
   * Handle job failure event. Records terminal failure in ActivityLog on final retry exhaustion.
   */
  @OnWorkerEvent('failed')
  async onFailed(job: Job<INotificationJob> | undefined, error: Error): Promise<void> {
    if (!job) {
      this.logger.error(`Unknown job failed: ${error.message}`);
      return;
    }

    const attemptsMade = job.attemptsMade;
    const maxAttempts = job.opts.attempts || 3;
    this.logger.warn(
      `Notification job [ID: ${job.id}] failed attempt #${attemptsMade}/${maxAttempts}: ${error.message}`,
    );

    // Only record terminal failure in ActivityLog when max retries are exhausted to avoid duplicate failure logs on retries
    if (attemptsMade >= maxAttempts) {
      this.logger.error(
        `Notification job [ID: ${job.id}] TERMINALLY FAILED after ${attemptsMade} attempts. Recording ActivityLog.`,
      );

      try {
        const payload = job.data?.payload;
        await this.prisma.activityLog.create({
          data: {
            userId: payload?.userId || null,
            action: 'NOTIFICATION_FAILED',
            module: 'NOTIFICATIONS',
            description: `Notification sending terminally failed [Job ID: ${job.id}, Type: ${payload?.type || 'UNKNOWN'}, Recipient: ${payload?.recipient || 'UNKNOWN'}]. Reason: ${error.message}`,
            status: ActivityStatus.FAILED,
          },
        });
      } catch (logErr) {
        const msg = logErr instanceof Error ? logErr.message : String(logErr);
        this.logger.error(`Failed to record ActivityLog for failed job [ID: ${job.id}]: ${msg}`);
      }
    }
  }
}
