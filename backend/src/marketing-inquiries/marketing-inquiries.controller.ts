import { Controller, Post, Body, Ip, Headers, Get, UseGuards } from '@nestjs/common';
import { MarketingInquiriesService } from './marketing-inquiries.service';
import { CreateMarketingInquiryDto } from './dto/create-marketing-inquiry.dto';
import { AdminAuthGuard } from '../contacts/admin-auth.guard';

@Controller('marketing-inquiries')
export class MarketingInquiriesController {
  constructor(private readonly marketingInquiriesService: MarketingInquiriesService) {}

  @Post()
  async create(
    @Body() dto: CreateMarketingInquiryDto,
    @Ip() ip: string,
    @Headers('user-agent') userAgent: string,
  ) {
    return this.marketingInquiriesService.create(dto, ip, userAgent);
  }

  @UseGuards(AdminAuthGuard)
  @Get()
  async findAll() {
    return this.marketingInquiriesService.findAll();
  }
}
