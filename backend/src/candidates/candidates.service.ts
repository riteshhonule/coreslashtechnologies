import { Injectable, BadRequestException, NotFoundException, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCandidateDto } from './dto/create-candidate.dto';
import { EmailService } from '../email/email.service';

@Injectable()
export class CandidatesService {
  private readonly logger = new Logger(CandidatesService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly emailService: EmailService,
  ) {}

  async create(dto: CreateCandidateDto, resumeUrl: string) {
    // Check for duplicate submission based on Email + Mobile Number
    const existing = await this.prisma.candidate.findFirst({
      where: {
        email: dto.email,
        mobile: dto.mobile,
      },
    });

    if (existing) {
      throw new BadRequestException('An application with this email and mobile number already exists.');
    }

    const candidate = await this.prisma.candidate.create({
      data: {
        fullName: dto.fullName,
        email: dto.email,
        mobile: dto.mobile,
        currentCity: dto.currentCity,
        position: dto.position,
        experience: dto.experience,
        qualification: dto.qualification,
        skills: dto.skills,
        resumeUrl,
        portfolioUrl: dto.portfolioUrl || null,
        introduction: dto.introduction || null,
      },
    });

    // Send emails asynchronously
    this.sendEmailsAsync(candidate);

    return { success: true, message: 'Application submitted successfully', id: candidate.id };
  }

  async findAll(filters: {
    search?: string;
    position?: string;
    experience?: string;
    qualification?: string;
    status?: string;
  }) {
    const where: any = {};

    if (filters.position && filters.position !== 'All') {
      where.position = filters.position;
    }
    if (filters.experience && filters.experience !== 'All') {
      where.experience = filters.experience;
    }
    if (filters.qualification && filters.qualification !== 'All') {
      where.qualification = filters.qualification;
    }
    if (filters.status && filters.status !== 'All') {
      where.status = filters.status;
    }

    if (filters.search) {
      const search = filters.search.toLowerCase();
      where.OR = [
        { fullName: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } },
        { mobile: { contains: search } },
      ];
    }

    return this.prisma.candidate.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string) {
    const candidate = await this.prisma.candidate.findUnique({
      where: { id },
    });
    if (!candidate) {
      throw new NotFoundException(`Candidate with ID ${id} not found`);
    }
    return candidate;
  }

  async updateStatus(id: string, status: string) {
    const candidate = await this.prisma.candidate.findUnique({
      where: { id },
    });
    if (!candidate) {
      throw new NotFoundException(`Candidate with ID ${id} not found`);
    }

    return this.prisma.candidate.update({
      where: { id },
      data: { status },
    });
  }

  private async sendEmailsAsync(candidate: any) {
    try {
      // Send HR email notification
      await this.emailService.sendCandidateNotification(candidate);
    } catch (err) {
      this.logger.error(`Error sending HR email notification: ${err.message}`);
    }

    try {
      // Send Candidate email confirmation
      await this.emailService.sendCandidateConfirmation(candidate);
    } catch (err) {
      this.logger.error(`Error sending candidate confirmation email: ${err.message}`);
    }
  }
}
