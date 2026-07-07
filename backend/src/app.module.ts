import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { ContactsModule } from './contacts/contacts.module';
import { EmailModule } from './email/email.module';
import { LeadsModule } from './leads/leads.module';
import { PrismaModule } from './prisma/prisma.module';
import { InquiriesModule } from './inquiries/inquiries.module';
import { MarketingInquiriesModule } from './marketing-inquiries/marketing-inquiries.module';
import { CandidatesModule } from './candidates/candidates.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
    }),
    EmailModule,
    ContactsModule,
    LeadsModule,
    PrismaModule,
    InquiriesModule,
    MarketingInquiriesModule,
    CandidatesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
