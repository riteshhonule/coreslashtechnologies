import { Injectable, Logger } from '@nestjs/common';
import { EmailService } from '../email/email.service';
import { CreateContactDto } from './dto/create-contact.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class ContactsService {
  private readonly logger = new Logger(ContactsService.name);

  constructor(
    private readonly emailService: EmailService,
    private readonly prisma: PrismaService,
  ) {}

  async create(data: CreateContactDto) {
    // Save to database
    const contact = await this.prisma.contact.create({
      data: {
        name: data.name,
        email: data.email,
        phone: data.phone,
        address: data.address,
        businessType: data.businessType,
        service: data.service,
        message: data.message,
      },
    });

    // Run the email notification in the background without blocking the HTTP request
    this.emailService.sendContactNotification(data).catch((err) => {
      this.logger.error(
        `Background email notification failed for contact from ${data.email}: ${err.message}`,
        err.stack,
      );
    });
    return contact;
  }

  async findAll(page: number = 1, limit: number = 10, search?: string, sortBy?: string) {
    const skip = (page - 1) * limit;

    const where: Prisma.ContactWhereInput = search
      ? {
          OR: [
            { name: { contains: search, mode: 'insensitive' } },
            { email: { contains: search, mode: 'insensitive' } },
            { phone: { contains: search, mode: 'insensitive' } },
          ],
        }
      : {};

    const orderBy: Prisma.ContactOrderByWithRelationInput = sortBy === 'oldest' 
      ? { createdAt: 'asc' } 
      : { createdAt: 'desc' };

    const [data, total] = await Promise.all([
      this.prisma.contact.findMany({
        where,
        skip,
        take: limit,
        orderBy,
      }),
      this.prisma.contact.count({ where }),
    ]);

    return {
      data,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    };
  }
}
