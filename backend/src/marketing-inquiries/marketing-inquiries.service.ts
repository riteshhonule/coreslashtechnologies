import { Injectable, BadRequestException, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateMarketingInquiryDto } from './dto/create-marketing-inquiry.dto';
import { EmailService } from '../email/email.service';

@Injectable()
export class MarketingInquiriesService {
  private readonly logger = new Logger(MarketingInquiriesService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly emailService: EmailService,
  ) {}

  async create(dto: CreateMarketingInquiryDto, ip: string, userAgent: string) {
    const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);

    const existingInquiry = await this.prisma.marketingInquiry.findFirst({
      where: {
        mobile: dto.mobile,
        createdAt: {
          gte: fiveMinutesAgo,
        },
      },
    });

    if (existingInquiry) {
      throw new BadRequestException('You have already submitted an inquiry recently. Please wait a few minutes before trying again.');
    }

    const inquiry = await this.prisma.marketingInquiry.create({
      data: {
        fullName: dto.fullName,
        mobile: dto.mobile,
        email: dto.email,
        college: dto.college,
        mode: dto.mode,
        focusAreas: dto.focusAreas,
        duration: dto.duration,
        ipAddress: ip,
        userAgent: userAgent,
      },
    });

    // Send emails asynchronously
    this.sendEmailsAsync(inquiry);

    return { success: true, message: 'Marketing internship inquiry received', id: inquiry.id };
  }

  async findAll() {
    return this.prisma.marketingInquiry.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  private async sendEmailsAsync(inquiry: any) {
    try {
      const adminEmail = process.env.MAIL_TO || 'coreslashtechnologies@gmail.com';

      // 1. Send notification to HR
      const adminHtml = `
        <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
          <h2 style="color: #4f46e5;">New Marketing Internship Inquiry</h2>
          <p><strong>Name:</strong> ${inquiry.fullName}</p>
          <p><strong>Mobile:</strong> ${inquiry.mobile}</p>
          <p><strong>Email:</strong> ${inquiry.email}</p>
          <p><strong>College/Qualification:</strong> ${inquiry.college}</p>
          <p><strong>Internship Mode:</strong> ${inquiry.mode}</p>
          <p><strong>Duration:</strong> ${inquiry.duration}</p>
          <p><strong>Focus Areas:</strong> ${inquiry.focusAreas.join(', ')}</p>
          <hr />
          <p style="font-size: 12px; color: #777;">IP: ${inquiry.ipAddress} | Browser: ${inquiry.userAgent}</p>
        </div>
      `;
      await this.emailService.sendEmail(adminEmail, `Marketing Internship: ${inquiry.fullName}`, adminHtml);

      // 2. Send confirmation to candidate
      const userHtml = `
        <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
          <h2 style="color: #333;">Application Received - Marketing Internship</h2>
          <p>Dear ${inquiry.fullName},</p>
          <p>Thank you for applying to the Marketing Internship Program at CoreSlash Technologies.</p>
          <p><strong>Internship Details:</strong></p>
          <ul>
            <li><strong>Mode:</strong> ${inquiry.mode}</li>
            <li><strong>Duration:</strong> ${inquiry.duration}</li>
            <li><strong>Areas of Focus:</strong> ${inquiry.focusAreas.join(', ')}</li>
          </ul>
          <p>Our team will review your application details. If your background aligns with our internship highlights, we will contact you shortly.</p>
          <br/>
          <p>Best Regards,</p>
          <p><strong>CoreSlash Technologies Recruitment Team</strong></p>
        </div>
      `;
      await this.emailService.sendEmail(inquiry.email, 'Marketing Internship Program Application Received - CoreSlash Technologies', userHtml);
      
    } catch (error) {
      this.logger.error('Failed to send marketing inquiry emails', error);
    }
  }
}
