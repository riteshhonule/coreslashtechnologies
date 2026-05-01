import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { EmailService } from '../email/email.service';
import { CreateContactDto } from './dto/create-contact.dto';

@Injectable()
export class ContactsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly emailService: EmailService,
  ) { }

  async create(data: CreateContactDto) {
    const contact = await this.prisma.contact.create({
      data,
    });
    await this.emailService.sendContactNotification(contact);
    return contact;
  }
}
