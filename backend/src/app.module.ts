import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { JobsModule } from './jobs/jobs.module';
import { EnquiriesModule } from './enquiries/enquiries.module';
import { AdminModule } from './admin/admin.module';
import { PartnershipsModule } from './partnerships/partnerships.module';

@Module({
  imports: [PrismaModule, JobsModule, EnquiriesModule, AdminModule, PartnershipsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
