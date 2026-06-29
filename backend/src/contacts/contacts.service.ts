import { Injectable, Logger } from '@nestjs/common';
import { EmailService } from '../email/email.service';
import { CreateContactDto } from './dto/create-contact.dto';

@Injectable()
export class ContactsService {
  private readonly logger = new Logger(ContactsService.name);

  constructor(private readonly emailService: EmailService) {}

  async create(data: CreateContactDto) {
    // Run the email notification in the background without blocking the HTTP request
    this.emailService.sendContactNotification(data).catch((err) => {
      this.logger.error(
        `Background email notification failed for contact from ${data.email}: ${err.message}`,
        err.stack,
      );
    });
    return data;
  }

  async findAll() {
    return [];
  }
}
