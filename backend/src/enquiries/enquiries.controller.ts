import { Controller, Post, Body } from '@nestjs/common';
import { EnquiriesService } from './enquiries.service';
import { CreateEnquiryDto } from './dto/create-enquiry.dto';

@Controller('enquiries')
export class EnquiriesController {
  constructor(private readonly enquiriesService: EnquiriesService) {}

  @Post('standard')
  async createStandard(@Body() createEnquiryDto: CreateEnquiryDto) {
    return this.enquiriesService.create(createEnquiryDto);
  }
}
