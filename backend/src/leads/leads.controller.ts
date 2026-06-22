import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { EmailService } from '../email/email.service';
import { CreateLeadDto } from './dto/create-lead.dto';

@Controller('leads')
export class LeadsController {
  constructor(private readonly emailService: EmailService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  async createLead(@Body() createLeadDto: CreateLeadDto) {
    const leadData = {
      name: createLeadDto.name,
      phone: createLeadDto.phone,
      address: createLeadDto.city, // Map city to address for the email format
      service: createLeadDto.service,
    };

    await this.emailService.sendLeadNotification(leadData);

    return {
      success: true,
      message: 'Lead has been successfully captured and dispatched',
    };
  }
}
