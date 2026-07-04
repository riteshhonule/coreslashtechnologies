import { Controller, Post, Body, Ip, Headers, BadRequestException } from '@nestjs/common';
import { InquiriesService } from './inquiries.service';
import { CreateInquiryDto } from './dto/create-inquiry.dto';

@Controller('inquiries')
export class InquiriesController {
  constructor(private readonly inquiriesService: InquiriesService) {}

  @Post()
  async create(
    @Body() createInquiryDto: CreateInquiryDto,
    @Ip() ip: string,
    @Headers('user-agent') userAgent: string,
  ) {
    return this.inquiriesService.create(createInquiryDto, ip, userAgent);
  }
}
