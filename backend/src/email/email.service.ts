import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
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
    this.fromEmail =
      this.configService.get<string>('SMTP_FROM') ||
      this.configService.get<string>('MAIL_FROM') ||
      'onboarding@resend.dev';

    if (smtpHost) {
      const port = this.configService.get<number>('SMTP_PORT') || 587;
      let secureSetting = this.configService.get<any>('SMTP_SECURE');
      if (typeof secureSetting === 'string') {
        secureSetting = secureSetting.toLowerCase() === 'true';
      }
      const secure = secureSetting ?? Number(port) === 465;
      const user = this.configService.get<string>('SMTP_USER');
      const pass = this.configService.get<string>('SMTP_PASS');

      this.logger.log(
        `SMTP configured: host=${smtpHost}, port=${port}, secure=${secure}, user=${user}`,
      );
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
        this.logger.warn(
          'Neither SMTP nor Resend has been configured. Email sending will fail.',
        );
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
    const sendPromise = async () => {
      if (this.useSmtp && this.transporter) {
        try {
          const info = await this.transporter.sendMail({
            from: this.fromEmail,
            to,
            subject,
            html,
          });
          this.logger.log(
            `Email sent successfully via SMTP to ${to}. MessageId: ${info.messageId}`,
          );
        } catch (err) {
          this.logger.error(
            `SMTP Error sending email: ${err.message}`,
            err.stack,
          );
          throw new InternalServerErrorException(
            'SMTP Email service unavailable',
          );
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
        this.logger.error(
          'No email service is configured. Please set RESEND_API_KEY or SMTP variables in .env',
        );
        throw new InternalServerErrorException('Email service not configured');
      }
    };

    const timeoutPromise = new Promise<void>((_, reject) =>
      setTimeout(() => reject(new Error('Email sending timed out (15s limit)')), 15000)
    );

    try {
      await Promise.race([sendPromise(), timeoutPromise]);
    } catch (err: any) {
      this.logger.error(`Failed to send email to ${to}: ${err.message}`);
      throw err;
    }
  }

  /**
   * Sends a structured contact notification
   */
  async sendContactNotification(contact: any): Promise<void> {
    const adminEmail =
      this.configService.get<string>('MAIL_TO') ||
      'contact@coreslashtechnologies.com';
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
    const adminEmail =
      this.configService.get<string>('MAIL_TO') ||
      'contact@coreslashtechnologies.com';
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

  /**
   * Sends a career candidate notification to HR
   */
  async sendCandidateNotification(candidate: any): Promise<void> {
    const adminEmail =
      this.configService.get<string>('MAIL_TO') ||
      'contact@coreslashtechnologies.com';
    
    const resumeDownloadUrl = candidate.resumeUrl.startsWith('http')
      ? candidate.resumeUrl
      : `${this.configService.get<string>('APP_URL') || 'http://localhost:3000'}${candidate.resumeUrl}`;

    const html = `
      <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #eee; border-radius: 10px; max-width: 600px; margin: 0 auto; color: #333;">
        <h2 style="color: #4f46e5; border-bottom: 2px solid #e5e7eb; padding-bottom: 10px; margin-bottom: 20px;">New Careers Application</h2>
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
          <tr>
            <td style="padding: 8px 0; font-weight: bold; width: 180px;">Full Name:</td>
            <td style="padding: 8px 0;">${candidate.fullName}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: bold;">Email:</td>
            <td style="padding: 8px 0;">${candidate.email}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: bold;">Mobile:</td>
            <td style="padding: 8px 0;">${candidate.mobile}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: bold;">Current City:</td>
            <td style="padding: 8px 0;">${candidate.currentCity}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: bold;">Position Applied:</td>
            <td style="padding: 8px 0; font-weight: #4f46e5; color: #4f46e5;">${candidate.position}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: bold;">Experience:</td>
            <td style="padding: 8px 0;">${candidate.experience}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: bold;">Highest Qualification:</td>
            <td style="padding: 8px 0;">${candidate.qualification}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: bold;">Key Skills:</td>
            <td style="padding: 8px 0;">${candidate.skills}</td>
          </tr>
          ${candidate.portfolioUrl ? `
          <tr>
            <td style="padding: 8px 0; font-weight: bold;">Portfolio/LinkedIn:</td>
            <td style="padding: 8px 0;"><a href="${candidate.portfolioUrl}" target="_blank">${candidate.portfolioUrl}</a></td>
          </tr>` : ''}
        </table>
        
        ${candidate.introduction ? `
        <div style="background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 8px; padding: 15px; margin-bottom: 20px;">
          <h4 style="margin: 0 0 10px 0; color: #4f46e5;">Candidate Introduction</h4>
          <p style="margin: 0; font-style: italic; line-height: 1.5;">"${candidate.introduction}"</p>
        </div>` : ''}

        <div style="text-align: center; margin-top: 30px;">
          <a href="${resumeDownloadUrl}" style="background-color: #4f46e5; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block;" target="_blank">Download Resume</a>
        </div>
      </div>
    `;

    return this.sendEmail(adminEmail, `Job Application: ${candidate.fullName} - ${candidate.position}`, html);
  }

  /**
   * Sends a structured confirmation email to the candidate
   */
  async sendCandidateConfirmation(candidate: any): Promise<void> {
    const html = `
      <div style="font-family: Arial, sans-serif; padding: 25px; border: 1px solid #eee; border-radius: 12px; max-width: 600px; margin: 0 auto; color: #333; line-height: 1.6;">
        <h2 style="color: #4f46e5; margin-bottom: 20px;">Thank you for your interest in CoreSlash Technologies!</h2>
        <p>Dear ${candidate.fullName},</p>
        <p>We've received your application and will contact you if your profile matches future opportunities.</p>
        <div style="background: #f9fafb; border-left: 4px solid #4f46e5; padding: 15px; margin: 20px 0; border-radius: 0 8px 8px 0;">
          <p style="margin: 0;"><strong>Position Applied:</strong> ${candidate.position}</p>
          <p style="margin: 5px 0 0 0;"><strong>Submission Date:</strong> ${new Date().toLocaleDateString()}</p>
        </div>
        <p>Our recruitment team will review your application details. If your skills and experience match our criteria, we will reach out to you to discuss potential next steps.</p>
        <p>We wish you the very best in your career pursuits.</p>
        <hr style="border: 0; border-top: 1px solid #eee; margin: 30px 0;" />
        <p style="font-size: 13px; color: #6b7280; margin: 0;">Best Regards,</p>
        <p style="font-size: 14px; font-weight: bold; color: #4f46e5; margin: 5px 0 0 0;">Recruitment Operations</p>
        <p style="font-size: 13px; color: #6b7280; margin: 0;">CoreSlash Technologies</p>
      </div>
    `;

    return this.sendEmail(candidate.email, 'Application Received - CoreSlash Technologies', html);
  }
}
