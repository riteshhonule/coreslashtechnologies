import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateJobApplicationDto } from './dto/create-job-application.dto';

@Injectable()
export class JobsService {
  constructor(private prisma: PrismaService) {}

  async create(createJobApplicationDto: CreateJobApplicationDto, resumeUrl: string) {
    return this.prisma.jobApplication.create({
      data: {
        ...createJobApplicationDto,
        resumeUrl,
      },
    });
  }
}
