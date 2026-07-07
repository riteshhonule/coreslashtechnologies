import { Module } from '@nestjs/common';
import { MarketingInquiriesController } from './marketing-inquiries.controller';
import { MarketingInquiriesService } from './marketing-inquiries.service';
import { EmailModule } from '../email/email.module';

@Module({
  imports: [EmailModule],
  controllers: [MarketingInquiriesController],
  providers: [MarketingInquiriesService],
})
export class MarketingInquiriesModule {}
