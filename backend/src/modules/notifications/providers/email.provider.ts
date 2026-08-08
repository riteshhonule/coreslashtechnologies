import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
import { PrismaService } from '@database/prisma.service';
import { INotificationPayload, NotificationProvider } from '../interfaces/notification.interface';
import { renderNotificationTemplate } from '../templates';

interface ISmtpConfig {
  host: string;
  port: number;
  secure: boolean;
  user?: string;
  pass?: string;
  from: string;
}

@Injectable()
export class EmailProvider implements NotificationProvider {
  private readonly logger = new Logger(EmailProvider.name);
  private cachedSmtpConfig: ISmtpConfig | null = null;
  private lastConfigCheck = 0;
  private readonly configCacheTtlMs = 60000; // 1 minute cache for SMTP config

  constructor(
    private readonly configService: ConfigService,
    private readonly prisma: PrismaService,
  ) {}

  /**
   * Resolve SMTP transporter configuration with environment variable precedence.
   */
  private async getSmtpConfig(): Promise<ISmtpConfig | null> {
    const now = Date.now();
    if (this.cachedSmtpConfig && now - this.lastConfigCheck < this.configCacheTtlMs) {
      return this.cachedSmtpConfig;
    }

    // 1. Primary: Environment Variables
    const envHost = this.configService.get<string>('SMTP_HOST');
    if (envHost && envHost.trim() !== '') {
      const config: ISmtpConfig = {
        host: envHost,
        port: parseInt(this.configService.get<string>('SMTP_PORT', '587'), 10),
        secure: this.configService.get<string>('SMTP_SECURE', 'false') === 'true',
        user: this.configService.get<string>('SMTP_USER') || undefined,
        pass: this.configService.get<string>('SMTP_PASSWORD') || undefined,
        from: this.configService.get<string>('SMTP_FROM', 'CoreSlash Technologies <noreply@coreslash.com>'),
      };
      this.cachedSmtpConfig = config;
      this.lastConfigCheck = now;
      return config;
    }

    // 2. Fallback: SystemSettings Table in PostgreSQL
    try {
      const systemSettings = await this.prisma.systemSettings.findFirst({
        where: { deletedAt: null },
      });

      if (systemSettings && systemSettings.smtpEnabled && systemSettings.smtpHost) {
        const config: ISmtpConfig = {
          host: systemSettings.smtpHost,
          port: systemSettings.smtpPort || 587,
          secure: systemSettings.smtpPort === 465,
          user: systemSettings.smtpUsername || undefined,
          pass: systemSettings.smtpPassword || undefined,
          from: this.configService.get<string>('SMTP_FROM', 'CoreSlash Technologies <noreply@coreslash.com>'),
        };
        this.cachedSmtpConfig = config;
        this.lastConfigCheck = now;
        return config;
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      this.logger.warn(`Failed to query SystemSettings for SMTP configuration: ${msg}`);
    }

    return null;
  }

  /**
   * Send single email notification.
   */
  async send(payload: INotificationPayload): Promise<boolean> {
    const config = await this.getSmtpConfig();
    if (!config) {
      this.logger.warn(`Email delivery skipped for recipient "${payload.recipient}": SMTP is not configured.`);
      return false;
    }

    const templateResult = renderNotificationTemplate(payload.template, payload.data || {});
    const subject = payload.subject || templateResult.subject;

    const transporterOptions: nodemailer.TransportOptions = {
      host: config.host,
      port: config.port,
      secure: config.secure,
    } as any;

    if (config.user && config.pass) {
      (transporterOptions as any).auth = {
        user: config.user,
        pass: config.pass,
      };
    }

    const transporter = nodemailer.createTransport(transporterOptions);

    this.logger.log(`Sending email to "${payload.recipient}" with subject: "${subject}"`);

    try {
      const info = await transporter.sendMail({
        from: config.from,
        to: payload.recipient,
        subject,
        html: templateResult.html,
        text: templateResult.text,
      });

      this.logger.log(`Email sent successfully to "${payload.recipient}". MessageId: ${info.messageId}`);
      return true;
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      this.logger.error(`SMTP delivery failed for "${payload.recipient}": ${msg}`);
      throw new Error(`Email provider failed: ${msg}`);
    }
  }

  /**
   * Bulk email send capability.
   */
  async sendBulk(payloads: INotificationPayload[]): Promise<boolean> {
    let allSuccessful = true;
    for (const payload of payloads) {
      try {
        await this.send(payload);
      } catch (err) {
        allSuccessful = false;
      }
    }
    return allSuccessful;
  }
}
