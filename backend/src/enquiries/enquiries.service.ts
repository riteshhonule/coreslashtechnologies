import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateEnquiryDto } from './dto/create-enquiry.dto';

@Injectable()
export class EnquiriesService {
  constructor(private prisma: PrismaService) {}

  async create(createEnquiryDto: CreateEnquiryDto) {
    return this.prisma.projectEnquiry.create({
      data: createEnquiryDto,
    });
  }
}
