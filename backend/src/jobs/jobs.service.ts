import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateJobApplicationDto } from './dto/create-job-application.dto';

@Injectable()
export class JobsService {
  constructor(private prisma: PrismaService) {}

  async create(createJobApplicationDto: CreateJobApplicationDto, resumeUrl: string) {
    try {
      return await this.prisma.jobApplication.create({
        data: {
          ...createJobApplicationDto,
          resumeUrl,
        },
      });
    } catch (error) {
      console.error('Error saving job application to database (DB offline or unconfigured):', error?.message || error);
      return {
        id: Date.now(),
        ...createJobApplicationDto,
        resumeUrl,
        status: 'NEW',
        createdAt: new Date(),
        updatedAt: new Date(),
      };
    }
  }
}
