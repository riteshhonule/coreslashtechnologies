import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Resend } from 'resend';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  private readonly resend: Resend | null = null;
  private readonly transporter: nodemailer.Transporter | null = null;
  private readonly logger = new Logger(EmailService.name);
  private readonly fromEmail: string;
  private readonly useSmtp: boolean = false;

  constructor(private readonly configService: ConfigService) {
    const smtpHost = this.configService.get<string>('SMTP_HOST');
    this.fromEmail = this.configService.get<string>('SMTP_FROM') || this.configService.get<string>('MAIL_FROM') || 'onboarding@resend.dev';

    if (smtpHost) {
      const port = this.configService.get<number>('SMTP_PORT') || 587;
      let secureSetting = this.configService.get<any>('SMTP_SECURE');
      if (typeof secureSetting === 'string') {
        secureSetting = secureSetting.toLowerCase() === 'true';
      }
      const secure = secureSetting ?? (Number(port) === 465);
      const user = this.configService.get<string>('SMTP_USER');
      const pass = this.configService.get<string>('SMTP_PASS');

      this.logger.log(`SMTP configured: host=${smtpHost}, port=${port}, secure=${secure}, user=${user}`);
      this.transporter = nodemailer.createTransport({
        host: smtpHost,
        port: Number(port),
        secure: secure,
        auth: {
          user,
          pass,
        },
      });
      this.useSmtp = true;
    } else {
      const apiKey = this.configService.get<string>('RESEND_API_KEY');
      if (apiKey) {
        this.resend = new Resend(apiKey);
        this.logger.log('Resend email service configured.');
      } else {
        this.logger.warn('Neither SMTP nor Resend has been configured. Email sending will fail.');
      }
    }
  }

  /**
   * Sends a basic email using Resend or SMTP
   * @param to Recipient email
   * @param subject Email subject
   * @param html HTML content of the email
   */
  async sendEmail(to: string, subject: string, html: string): Promise<void> {
    if (this.useSmtp && this.transporter) {
      try {
        const info = await this.transporter.sendMail({
          from: this.fromEmail,
          to,
          subject,
          html,
        });
        this.logger.log(`Email sent successfully via SMTP to ${to}. MessageId: ${info.messageId}`);
      } catch (err) {
        this.logger.error(`SMTP Error sending email: ${err.message}`, err.stack);
        throw new InternalServerErrorException('SMTP Email service unavailable');
      }
    } else if (this.resend) {
      try {
        const { data, error } = await this.resend.emails.send({
          from: this.fromEmail,
          to,
          subject,
          html,
        });

        if (error) {
          this.logger.error(`Resend API Error: ${JSON.stringify(error)}`);
          throw new InternalServerErrorException('Failed to send email');
        }

        this.logger.log(`Email sent successfully to ${to}. ID: ${data?.id}`);
      } catch (err) {
        this.logger.error(`Unhandled Error sending email: ${err.message}`);
        throw new InternalServerErrorException('Email service unavailable');
      }
    } else {
      this.logger.error('No email service is configured. Please set RESEND_API_KEY or SMTP variables in .env');
      throw new InternalServerErrorException('Email service not configured');
    }
  }

  /**
   * Sends a structured contact notification
   */
  async sendContactNotification(contact: any): Promise<void> {
    const adminEmail = this.configService.get<string>('MAIL_TO') || 'coreslashtechnologies@gmail.com';
    const html = `
      <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
        <h2 style="color: #333;">New Contact Inquiry</h2>
        <p><strong>Name:</strong> ${contact.name}</p>
        <p><strong>Email:</strong> ${contact.email}</p>
        <p><strong>Phone:</strong> ${contact.phone}</p>
        <p><strong>Address:</strong> ${contact.address || 'N/A'}</p>
        <p><strong>Industry:</strong> ${contact.businessType || 'N/A'}</p>
        <p><strong>Service Requested:</strong> ${contact.service || 'N/A'}</p>
        <hr />
        <p><strong>Message:</strong></p>
        <p style="background: #f9f9f9; padding: 15px; border-radius: 5px;">${contact.message}</p>
      </div>
    `;

    return this.sendEmail(adminEmail, `New Inquiry: ${contact.name}`, html);
  }

  /**
   * Sends a structured lead notification
   */
  async sendLeadNotification(lead: any): Promise<void> {
    const adminEmail = this.configService.get<string>('MAIL_TO') || 'coreslashtechnologies@gmail.com';
    const html = `
      <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
        <h2 style="color: #007bff;">New Lead Captured</h2>
        <p><strong>Name:</strong> ${lead.name}</p>
        <p><strong>Email:</strong> ${lead.email || 'N/A'}</p>
        <p><strong>Phone:</strong> ${lead.phone}</p>
        <p><strong>Address:</strong> ${lead.address || 'N/A'}</p>
        <p><strong>Industry:</strong> ${lead.businessType || 'N/A'}</p>
        <p><strong>Service Requested:</strong> ${lead.service || 'General'}</p>
        <hr />
        <p style="font-size: 12px; color: #777;">Source: Automated Lead System</p>
      </div>
    `;

    return this.sendEmail(adminEmail, `New Lead: ${lead.name}`, html);
  }
}
