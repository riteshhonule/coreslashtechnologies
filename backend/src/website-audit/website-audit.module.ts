import { Module } from '@nestjs/common';
import { WebsiteAuditController } from './website-audit.controller';
import { WebsiteAuditService } from './website-audit.service';
import { AuditRateLimitGuard } from './guards/rate-limit.guard';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [WebsiteAuditController],
  providers: [WebsiteAuditService, AuditRateLimitGuard],
  exports: [WebsiteAuditService],
})
export class WebsiteAuditModule {}
