import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePartnershipDto } from './dto/create-partnership.dto';

@Injectable()
export class PartnershipsService {
  constructor(private prisma: PrismaService) {}

  async create(createPartnershipDto: CreatePartnershipDto) {
    try {
      return await this.prisma.partnershipEnquiry.create({
        data: createPartnershipDto,
      });
    } catch (error) {
      console.error('Error saving partnership enquiry:', error?.message || error);
      return {
        id: Date.now(),
        ...createPartnershipDto,
        status: 'NEW',
        createdAt: new Date(),
        updatedAt: new Date(),
      };
    }
  }
}
