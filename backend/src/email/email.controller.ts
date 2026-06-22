import { Body, Controller, Post, HttpCode, HttpStatus } from '@nestjs/common';
import { EmailService } from './email.service';
import { SendEmailDto } from './dto/send-email.dto';

@Controller('email')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @Post('send')
  @HttpCode(HttpStatus.OK)
  async sendEmail(@Body() sendEmailDto: SendEmailDto) {
    const { to, subject, message } = sendEmailDto;

    // Convert plain text message to simple HTML for the service
    const html = `<div style="font-family: sans-serif; line-height: 1.5; color: #333;">${message.replace(/\n/g, '<br>')}</div>`;

    await this.emailService.sendEmail(to, subject, html);

    return {
      success: true,
      message: 'Email has been dispatched successfully',
    };
  }
}
