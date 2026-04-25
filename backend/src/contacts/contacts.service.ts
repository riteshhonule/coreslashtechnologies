import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateContactDto } from './dto/create-contact.dto';

@Injectable()
export class ContactsService {
  constructor(private readonly prisma: PrismaService) { }

  async create(data: CreateContactDto) {
    return this.prisma.contact.create({
      data,
    });
  }
}
