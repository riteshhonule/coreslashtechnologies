import { Controller, Post, Get, Body, Param, Res, UseGuards } from '@nestjs/common';
import { WebsiteAuditService } from './website-audit.service';
import { CreateAuditDto } from './dto/create-audit.dto';
import { AuditRateLimitGuard } from './guards/rate-limit.guard';
import type { Response } from 'express';

@Controller('website-audit')
export class WebsiteAuditController {
  constructor(private readonly websiteAuditService: WebsiteAuditService) {}

  @Post()
  @UseGuards(AuditRateLimitGuard)
  async createAudit(@Body() dto: CreateAuditDto) {
    return this.websiteAuditService.createAudit(dto);
  }

  @Get(':auditId')
  async getAuditStatus(@Param('auditId') auditId: string) {
    return this.websiteAuditService.getAuditStatus(auditId);
  }

  @Get(':auditId/report')
  async getAuditReport(@Param('auditId') auditId: string) {
    return this.websiteAuditService.getAuditStatus(auditId);
  }

  @Get(':auditId/pdf')
  async getAuditPdf(@Param('auditId') auditId: string, @Res() res: Response) {
    const pdfBuffer = await this.websiteAuditService.getAuditPdf(auditId);
    
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="${auditId}_CoreSlash_Audit.pdf"`);
    res.send(pdfBuffer);
  }
}
