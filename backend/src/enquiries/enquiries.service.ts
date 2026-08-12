import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateEnquiryDto } from './dto/create-enquiry.dto';

@Injectable()
export class EnquiriesService {
  constructor(private prisma: PrismaService) {}

  async create(createEnquiryDto: CreateEnquiryDto) {
    try {
      return await this.prisma.projectEnquiry.create({
        data: createEnquiryDto,
      });
    } catch (error) {
      console.error('Error saving enquiry to database (DB offline or unconfigured):', error?.message || error);
      return {
        id: Date.now(),
        ...createEnquiryDto,
        status: 'NEW',
        createdAt: new Date(),
        updatedAt: new Date(),
      };
    }
  }
}
