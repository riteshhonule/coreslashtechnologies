import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';

export interface AuditLeadNotificationData {
  auditId: string;
  url: string;
  email: string;
  overallScore?: number | null;
  grade?: string | null;
  completedAt?: Date | string | null;
  competitorUrl?: string | null;
  categoryScores?: Record<string, number | null>;
}

export interface EmailSendResult {
  success: boolean;
  messageId?: string;
  skipped?: boolean;
  reason?: string;
  error?: string;
}

@Injectable()
export class EmailService {
  private readonly logger = new Logger(EmailService.name);
  private transporter: nodemailer.Transporter | null = null;
  private readonly fromEmail: string;
  private readonly salesEmail: string;
  private readonly appUrl: string;
  private readonly resendApiKey: string | null = null;

  constructor(private readonly configService: ConfigService) {
    const smtpHost = this.configService.get<string>('SMTP_HOST') || process.env.SMTP_HOST;
    this.fromEmail =
      this.configService.get<string>('SMTP_FROM') ||
      process.env.SMTP_FROM ||
      this.configService.get<string>('MAIL_FROM') ||
      process.env.MAIL_FROM ||
      'CoreSlash Website Audit <notifications@coreslash.com>';

    this.salesEmail =
      this.configService.get<string>('SALES_NOTIFICATION_EMAIL') ||
      process.env.SALES_NOTIFICATION_EMAIL ||
      this.configService.get<string>('MAIL_TO') ||
      process.env.MAIL_TO ||
      this.configService.get<string>('SALES_EMAIL') ||
      process.env.SALES_EMAIL ||
      'contact@coreslashtechnologies.com';

    this.appUrl =
      this.configService.get<string>('APP_URL') ||
      process.env.APP_URL ||
      this.configService.get<string>('FRONTEND_URL') ||
      process.env.FRONTEND_URL ||
      'https://coreslashtechnologies.com';

    this.resendApiKey =
      this.configService.get<string>('RESEND_API_KEY') ||
      process.env.RESEND_API_KEY ||
      null;

    if (smtpHost) {
      const port = Number(this.configService.get<number>('SMTP_PORT') || process.env.SMTP_PORT || 587);
      const secureSetting = this.configService.get<string | boolean>('SMTP_SECURE') || process.env.SMTP_SECURE;
      const secure =
        typeof secureSetting === 'string'
          ? secureSetting.toLowerCase() === 'true'
          : Boolean(secureSetting) || port === 465;
      const user = this.configService.get<string>('SMTP_USER') || process.env.SMTP_USER;
      const pass =
        this.configService.get<string>('SMTP_PASS') ||
        process.env.SMTP_PASS ||
        this.configService.get<string>('SMTP_PASSWORD') ||
        process.env.SMTP_PASSWORD;

      this.transporter = nodemailer.createTransport({
        host: smtpHost,
        port,
        secure,
        auth: user && pass ? { user, pass } : undefined,
      });
      this.logger.log(`[EmailService] SMTP transporter initialized (${smtpHost}:${port})`);
    } else if (this.resendApiKey) {
      this.logger.log(`[EmailService] Resend API initialized for email delivery`);
    } else {
      this.logger.warn(
        `[EmailService] No email provider configured (neither SMTP nor RESEND_API_KEY). Simulated email mode active.`,
      );
    }
  }

  /**
   * Sends a structured sales notification when an audit with an email completes.
   */
  async sendSalesAuditLeadNotification(data: AuditLeadNotificationData): Promise<EmailSendResult> {
    if (!data.email || !data.email.trim()) {
      return { success: false, skipped: true, reason: 'NO_LEAD_EMAIL' };
    }

    let hostname = data.url;
    try {
      hostname = new URL(data.url).hostname;
    } catch {
      // fallback to raw URL
    }

    const subject = `New Website Audit Lead — ${hostname}`;
    const adminLeadUrl = `${this.appUrl}/admin/dashboard?tab=audit-leads&search=${encodeURIComponent(data.email)}`;

    const html = this.buildLeadEmailHtml(data, hostname, adminLeadUrl);
    const text = this.buildLeadEmailText(data, hostname, adminLeadUrl);

    return this.sendMail({
      to: this.salesEmail,
      subject,
      html,
      text,
    });
  }

  /**
   * Internal generic mail dispatcher supporting SMTP, Resend API, and safe fallback.
   */
  async sendMail(options: { to: string; subject: string; html: string; text?: string }): Promise<EmailSendResult> {
    // 1. SMTP Provider
    if (this.transporter) {
      try {
        const info = await this.transporter.sendMail({
          from: this.fromEmail,
          to: options.to,
          subject: options.subject,
          html: options.html,
          text: options.text,
        });
        this.logger.log(`[EmailService] Email successfully sent via SMTP to ${options.to}. MessageId: ${info.messageId}`);
        return { success: true, messageId: info.messageId };
      } catch (err: any) {
        this.logger.error(`[EmailService] SMTP delivery failed to ${options.to}: ${err.message}`, err.stack);
        return { success: false, error: err.message };
      }
    }

    // 2. Resend API Provider
    if (this.resendApiKey) {
      try {
        const res = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${this.resendApiKey}`,
          },
          body: JSON.stringify({
            from: this.fromEmail,
            to: options.to,
            subject: options.subject,
            html: options.html,
            text: options.text,
          }),
        });

        const resData = (await res.json()) as any;
        if (!res.ok) {
          const errMsg = resData?.message || `Resend HTTP error ${res.status}`;
          this.logger.error(`[EmailService] Resend API error: ${errMsg}`);
          return { success: false, error: errMsg };
        }

        this.logger.log(`[EmailService] Email sent via Resend API to ${options.to}. ID: ${resData?.id}`);
        return { success: true, messageId: resData?.id };
      } catch (err: any) {
        this.logger.error(`[EmailService] Resend fetch failed: ${err.message}`, err.stack);
        return { success: false, error: err.message };
      }
    }

    // 3. Fallback when neither provider is configured (e.g. local development)
    this.logger.warn(
      `[EmailService] Delivery simulated for "${options.to}". Subject: "${options.subject}". Reason: Neither SMTP nor Resend configured.`,
    );
    return { success: true, skipped: true, reason: 'SIMULATED_NO_PROVIDER_CONFIGURED' };
  }

  private buildLeadEmailHtml(data: AuditLeadNotificationData, hostname: string, adminLeadUrl: string): string {
    const scoreText = data.overallScore !== null && data.overallScore !== undefined ? `${data.overallScore} / 100` : 'N/A';
    const gradeBadge = data.grade ? `Grade ${data.grade}` : '';
    const scoreColor =
      data.overallScore !== null && data.overallScore !== undefined
        ? data.overallScore >= 80
          ? '#10b981'
          : data.overallScore >= 50
            ? '#f59e0b'
            : '#ef4444'
        : '#64748b';

    const categories = data.categoryScores || {};
    const catRows = Object.entries(categories)
      .map(([key, val]) => {
        const label = key.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase());
        const displayVal = val !== null && val !== undefined ? `${val}%` : 'N/A';
        return `
          <tr style="border-bottom: 1px solid #f1f5f9;">
            <td style="padding: 8px 12px; font-size: 13px; color: #475569;">${label}</td>
            <td style="padding: 8px 12px; font-size: 13px; font-weight: bold; color: #0f172a; text-align: right;">${displayVal}</td>
          </tr>
        `;
      })
      .join('');

    const completedDate = data.completedAt ? new Date(data.completedAt).toUTCString() : new Date().toUTCString();

    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New Website Audit Lead</title>
      </head>
      <body style="margin: 0; padding: 24px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f8fafc;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; border: 1px solid #e2e8f0; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);">
          <!-- Header Banner -->
          <div style="background: linear-gradient(135deg, #1e3a8a 0%, #2563eb 100%); padding: 28px 24px; text-align: center;">
            <div style="display: inline-block; background-color: rgba(255, 255, 255, 0.15); padding: 4px 12px; border-radius: 9999px; margin-bottom: 8px;">
              <span style="color: #ffffff; font-size: 11px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase;">CoreSlash Website Audit Lead</span>
            </div>
            <h1 style="color: #ffffff; font-size: 22px; margin: 0; font-weight: 800;">New Audit Lead Captured</h1>
            <p style="color: #bfdbfe; font-size: 14px; margin: 6px 0 0 0;">An audit with contact details has completed successfully.</p>
          </div>

          <!-- Main Content -->
          <div style="padding: 24px;">
            <!-- Key Lead Highlights -->
            <div style="background-color: #f1f5f9; border-radius: 8px; padding: 16px; margin-bottom: 20px;">
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 6px 0; font-size: 12px; color: #64748b; text-transform: uppercase; font-weight: 700; width: 35%;">Audited Website</td>
                  <td style="padding: 6px 0; font-size: 14px; color: #0f172a; font-weight: 600;">
                    <a href="${data.url}" target="_blank" style="color: #2563eb; text-decoration: none;">${data.url}</a>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 6px 0; font-size: 12px; color: #64748b; text-transform: uppercase; font-weight: 700;">Work Email</td>
                  <td style="padding: 6px 0; font-size: 14px; color: #0f172a; font-weight: 700;">
                    <a href="mailto:${data.email}" style="color: #0f172a; text-decoration: underline;">${data.email}</a>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 6px 0; font-size: 12px; color: #64748b; text-transform: uppercase; font-weight: 700;">Audit Score</td>
                  <td style="padding: 6px 0; font-size: 15px; font-weight: 800; color: ${scoreColor};">
                    ${scoreText} ${gradeBadge ? `(${gradeBadge})` : ''}
                  </td>
                </tr>
                ${
                  data.competitorUrl
                    ? `
                <tr>
                  <td style="padding: 6px 0; font-size: 12px; color: #64748b; text-transform: uppercase; font-weight: 700;">Competitor URL</td>
                  <td style="padding: 6px 0; font-size: 13px; color: #475569;">${data.competitorUrl}</td>
                </tr>`
                    : ''
                }
                <tr>
                  <td style="padding: 6px 0; font-size: 12px; color: #64748b; text-transform: uppercase; font-weight: 700;">Audit ID</td>
                  <td style="padding: 6px 0; font-size: 13px; color: #64748b; font-family: monospace;">${data.auditId}</td>
                </tr>
                <tr>
                  <td style="padding: 6px 0; font-size: 12px; color: #64748b; text-transform: uppercase; font-weight: 700;">Completed At</td>
                  <td style="padding: 6px 0; font-size: 13px; color: #64748b;">${completedDate}</td>
                </tr>
              </table>
            </div>

            <!-- Category Scores breakdown if available -->
            ${
              catRows
                ? `
            <div style="margin-bottom: 24px;">
              <h3 style="font-size: 13px; font-weight: 700; color: #334155; text-transform: uppercase; letter-spacing: 0.05em; margin: 0 0 10px 0;">Category Breakdown</h3>
              <table style="width: 100%; border-collapse: collapse; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 6px; overflow: hidden;">
                ${catRows}
              </table>
            </div>`
                : ''
            }

            <!-- CTA Button -->
            <div style="text-align: center; margin: 28px 0 16px 0;">
              <a href="${adminLeadUrl}" target="_blank" style="display: inline-block; background-color: #2563eb; color: #ffffff; padding: 12px 28px; font-size: 14px; font-weight: 700; text-decoration: none; border-radius: 8px; box-shadow: 0 2px 4px rgba(37, 99, 235, 0.2);">
                View Lead in Admin Dashboard &rarr;
              </a>
            </div>
            <p style="text-align: center; font-size: 11px; color: #94a3b8; margin: 0;">
              Internal link requires active super admin session.
            </p>
          </div>

          <!-- Footer -->
          <div style="background-color: #f8fafc; border-top: 1px solid #e2e8f0; padding: 16px 24px; text-align: center;">
            <p style="font-size: 12px; color: #64748b; margin: 0;">
              &copy; CoreSlash Technologies &bull; Automated Lead Notification System
            </p>
          </div>
        </div>
      </body>
      </html>
    `;
  }

  private buildLeadEmailText(data: AuditLeadNotificationData, hostname: string, adminLeadUrl: string): string {
    const scoreText = data.overallScore !== null && data.overallScore !== undefined ? `${data.overallScore}/100` : 'N/A';
    const gradeText = data.grade ? ` (Grade ${data.grade})` : '';

    return `
========================================
NEW WEBSITE AUDIT LEAD — ${hostname}
========================================

A website audit with contact details was completed.

Lead Details:
- Website: ${data.url}
- Work Email: ${data.email}
- Overall Score: ${scoreText}${gradeText}
- Audit ID: ${data.auditId}
- Competitor: ${data.competitorUrl || 'None'}
- Completed At: ${data.completedAt ? new Date(data.completedAt).toUTCString() : new Date().toUTCString()}

Admin Dashboard Access:
${adminLeadUrl}

----------------------------------------
CoreSlash Technologies Lead Notification System
    `.trim();
  }
}

