import { Controller, Post, Body, HttpCode, HttpStatus, Logger } from '@nestjs/common';
import { EmailService } from '../email/email.service';
import { CreateLeadDto } from './dto/create-lead.dto';

@Controller('leads')
export class LeadsController {
  private readonly logger = new Logger(LeadsController.name);

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

    // Run the email notification in the background without blocking the HTTP request
    this.emailService.sendLeadNotification(leadData).catch((err) => {
      this.logger.error(
        `Background email notification failed for lead from ${createLeadDto.phone}: ${err.message}`,
        err.stack,
      );
    });

    return {
      success: true,
      message: 'Lead has been successfully captured and dispatched',
    };
  }
}
