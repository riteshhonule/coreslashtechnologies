import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { EmailService } from '../email/email.service';
import { CreateLeadDto } from './dto/create-lead.dto';

@Injectable()
export class LeadsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly emailService: EmailService,
  ) { }

  async create(data: CreateLeadDto) {
    const lead = await this.prisma.lead.create({
      data,
    });
    await this.emailService.sendLeadNotification(lead);
    return lead;
  }
}
