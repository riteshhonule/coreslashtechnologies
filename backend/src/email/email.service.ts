import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Resend } from 'resend';

@Injectable()
export class EmailService {
  private readonly resend: Resend;
  private readonly logger = new Logger(EmailService.name);
  private readonly fromEmail: string = 'onboarding@resend.dev';

  constructor(private readonly configService: ConfigService) {
    const apiKey = this.configService.get<string>('RESEND_API_KEY');
    if (!apiKey) {
      this.logger.error('RESEND_API_KEY is not defined in environment variables');
    }
    this.resend = new Resend(apiKey);
  }

  /**
   * Sends a basic email using Resend
   * @param to Recipient email
   * @param subject Email subject
   * @param html HTML content of the email
   */
  async sendEmail(to: string, subject: string, html: string): Promise<void> {
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
