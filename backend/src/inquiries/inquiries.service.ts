import { Injectable, BadRequestException, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateInquiryDto } from './dto/create-inquiry.dto';
import { EmailService } from '../email/email.service';

@Injectable()
export class InquiriesService {
  private readonly logger = new Logger(InquiriesService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly emailService: EmailService,
  ) {}

  async create(createInquiryDto: CreateInquiryDto, ip: string, userAgent: string) {
    // 5-minute rate limit check based on mobile number
    const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);
    
    const existingInquiry = await this.prisma.inquiry.findFirst({
      where: {
        mobile: createInquiryDto.mobile,
        createdAt: {
          gte: fiveMinutesAgo,
        },
      },
    });

    if (existingInquiry) {
      throw new BadRequestException('You have already submitted an inquiry recently. Please wait a few minutes before trying again.');
    }

    const inquiry = await this.prisma.inquiry.create({
      data: {
        fullName: createInquiryDto.fullName,
        mobile: createInquiryDto.mobile,
        email: createInquiryDto.email,
        organization: createInquiryDto.organization,
        services: createInquiryDto.services,
        ipAddress: ip,
        userAgent: userAgent,
      },
    });

    // Send emails asynchronously
    this.sendEmailsAsync(inquiry);

    return { success: true, message: 'Inquiry received', id: inquiry.id };
  }

  async findAll() {
    return this.prisma.inquiry.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  private async sendEmailsAsync(inquiry: any) {
    try {
      // 1. Send notification to coreslashtechnologies@gmail.com
      const adminHtml = `
        <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
          <h2 style="color: #007bff;">New Premium Inquiry</h2>
          <p><strong>Name:</strong> ${inquiry.fullName}</p>
          <p><strong>Mobile:</strong> ${inquiry.mobile}</p>
          <p><strong>Email:</strong> ${inquiry.email}</p>
          <p><strong>Organization/College:</strong> ${inquiry.organization || 'N/A'}</p>
          <p><strong>Services Requested:</strong> ${inquiry.services.join(', ')}</p>
          <hr />
          <p style="font-size: 12px; color: #777;">IP: ${inquiry.ipAddress} | Browser: ${inquiry.userAgent}</p>
        </div>
      `;
      await this.emailService.sendEmail('coreslashtechnologies@gmail.com', `New Inquiry from ${inquiry.fullName}`, adminHtml);

      // 2. Send confirmation to user
      const userHtml = `
        <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
          <h2 style="color: #333;">Thank you for your inquiry!</h2>
          <p>Dear ${inquiry.fullName},</p>
          <p>We have successfully received your inquiry for the following services:</p>
          <ul>
            ${inquiry.services.map(s => `<li>${s}</li>`).join('')}
          </ul>
          <p>Our team at CoreSlash Technologies will review your request and get back to you shortly.</p>
          <br/>
          <p>Best Regards,</p>
          <p><strong>CoreSlash Technologies</strong></p>
        </div>
      `;
      await this.emailService.sendEmail(inquiry.email, 'We have received your inquiry - CoreSlash Technologies', userHtml);
      
    } catch (error) {
      this.logger.error('Failed to send inquiry emails', error);
    }
  }
}
