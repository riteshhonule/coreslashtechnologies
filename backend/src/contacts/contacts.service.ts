import { Injectable } from '@nestjs/common';
import { EmailService } from '../email/email.service';
import { CreateContactDto } from './dto/create-contact.dto';

@Injectable()
export class ContactsService {
  constructor(
    private readonly emailService: EmailService,
  ) { }

  async create(data: CreateContactDto) {
    await this.emailService.sendContactNotification(data);
    return data;
  }

  async findAll() {
    return [];
  }
}
