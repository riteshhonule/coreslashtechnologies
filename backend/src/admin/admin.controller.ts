import { Controller, Get, Post, Body, Patch, Param, UseGuards, Query, NotFoundException, BadRequestException } from '@nestjs/common';
import { AdminAuthService } from './admin-auth.service';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGuard } from './jwt-auth.guard';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateStatusDto } from './dto/update-status.dto';

@Controller('admin')
export class AdminController {
  constructor(
    private readonly adminAuthService: AdminAuthService,
    private readonly prisma: PrismaService,
  ) {}

  @Post('login')
  login(@Body() loginDto: LoginDto) {
    return this.adminAuthService.login(loginDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('stats')
  async getStats() {
    try {
      const [
        totalJobs,
        newJobs,
        totalEnquiries,
        newEnquiries,
        totalPartnerships,
        newPartnerships,
        totalAuditLeads,
        completedAuditLeads,
        failedAuditLeads,
        totalAudits,
      ] = await Promise.all([
        this.prisma.jobApplication.count(),
        this.prisma.jobApplication.count({ where: { status: 'NEW' } }),
        this.prisma.projectEnquiry.count(),
        this.prisma.projectEnquiry.count({ where: { status: 'NEW' } }),
        this.prisma.partnershipEnquiry.count(),
        this.prisma.partnershipEnquiry.count({ where: { status: 'NEW' } }),
        this.prisma.websiteAudit.count({ where: { email: { not: null, notIn: [''] } } }),
        this.prisma.websiteAudit.count({ where: { email: { not: null, notIn: [''] }, status: 'COMPLETED' } }),
        this.prisma.websiteAudit.count({ where: { email: { not: null, notIn: [''] }, status: 'FAILED' } }),
        this.prisma.websiteAudit.count(),
      ]);

      return {
        totalJobs,
        newJobs,
        totalEnquiries,
        newEnquiries,
        totalPartnerships,
        newPartnerships,
        totalAuditLeads,
        completedAuditLeads,
        failedAuditLeads,
        totalAudits,
      };
    } catch (error) {
      console.error('Error getting admin stats:', error?.message || error);
      return {
        totalJobs: 0,
        newJobs: 0,
        totalEnquiries: 0,
        newEnquiries: 0,
        totalPartnerships: 0,
        newPartnerships: 0,
        totalAuditLeads: 0,
        completedAuditLeads: 0,
        failedAuditLeads: 0,
        totalAudits: 0,
      };
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('jobs')
  async getJobs(
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '10',
    @Query('search') search: string = '',
    @Query('status') status: string = '',
  ) {
    const pageNumber = parseInt(page, 10);
    const limitNumber = parseInt(limit, 10);
    const skip = (pageNumber - 1) * limitNumber;

    try {
      const where: any = {};
      if (search) {
        where.OR = [
          { fullName: { contains: search, mode: 'insensitive' } },
          { email: { contains: search, mode: 'insensitive' } },
          { position: { contains: search, mode: 'insensitive' } },
        ];
      }
      if (status) {
        where.status = status;
      }

      const [items, total] = await Promise.all([
        this.prisma.jobApplication.findMany({
          where,
          skip,
          take: limitNumber,
          orderBy: { createdAt: 'desc' },
        }),
        this.prisma.jobApplication.count({ where }),
      ]);

      return {
        items,
        total,
        page: pageNumber,
        totalPages: Math.ceil(total / limitNumber),
      };
    } catch (error) {
      console.error('Error fetching jobs:', error?.message || error);
      return { items: [], total: 0, page: pageNumber, totalPages: 0 };
    }
  }

  @UseGuards(JwtAuthGuard)
  @Patch('jobs/:id/status')
  async updateJobStatus(@Param('id') id: string, @Body() updateStatusDto: UpdateStatusDto) {
    try {
      return await this.prisma.jobApplication.update({
        where: { id: parseInt(id, 10) },
        data: { status: updateStatusDto.status as any },
      });
    } catch (error) {
      console.error('Error updating job status:', error?.message || error);
      return { id: parseInt(id, 10), status: updateStatusDto.status };
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('enquiries')
  async getEnquiries(
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '10',
    @Query('search') search: string = '',
    @Query('status') status: string = '',
  ) {
    const pageNumber = parseInt(page, 10);
    const limitNumber = parseInt(limit, 10);
    const skip = (pageNumber - 1) * limitNumber;

    try {
      const where: any = {};
      if (search) {
        where.OR = [
          { fullName: { contains: search, mode: 'insensitive' } },
          { workEmail: { contains: search, mode: 'insensitive' } },
          { service: { contains: search, mode: 'insensitive' } },
          { location: { contains: search, mode: 'insensitive' } },
        ];
      }
      if (status) {
        where.status = status;
      }

      const [items, total] = await Promise.all([
        this.prisma.projectEnquiry.findMany({
          where,
          skip,
          take: limitNumber,
          orderBy: { createdAt: 'desc' },
        }),
        this.prisma.projectEnquiry.count({ where }),
      ]);

      return {
        items,
        total,
        page: pageNumber,
        totalPages: Math.ceil(total / limitNumber),
      };
    } catch (error) {
      console.error('Error fetching enquiries:', error?.message || error);
      return { items: [], total: 0, page: pageNumber, totalPages: 0 };
    }
  }

  @UseGuards(JwtAuthGuard)
  @Patch('enquiries/:id/status')
  async updateEnquiryStatus(@Param('id') id: string, @Body() updateStatusDto: UpdateStatusDto) {
    try {
      return await this.prisma.projectEnquiry.update({
        where: { id: parseInt(id, 10) },
        data: { status: updateStatusDto.status as any },
      });
    } catch (error) {
      console.error('Error updating enquiry status:', error?.message || error);
      return { id: parseInt(id, 10), status: updateStatusDto.status };
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('partnerships')
  async getPartnerships(
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '10',
    @Query('search') search: string = '',
    @Query('status') status: string = '',
  ) {
    const pageNumber = parseInt(page, 10);
    const limitNumber = parseInt(limit, 10);
    const skip = (pageNumber - 1) * limitNumber;

    try {
      const where: any = {};
      if (search) {
        where.OR = [
          { fullName: { contains: search, mode: 'insensitive' } },
          { workEmail: { contains: search, mode: 'insensitive' } },
          { contactNumber: { contains: search, mode: 'insensitive' } },
          { companyName: { contains: search, mode: 'insensitive' } },
          { partnershipType: { contains: search, mode: 'insensitive' } },
        ];
      }
      if (status) {
        where.status = status;
      }

      const [items, total] = await Promise.all([
        this.prisma.partnershipEnquiry.findMany({
          where,
          skip,
          take: limitNumber,
          orderBy: { createdAt: 'desc' },
        }),
        this.prisma.partnershipEnquiry.count({ where }),
      ]);

      return {
        items,
        total,
        page: pageNumber,
        totalPages: Math.ceil(total / limitNumber),
      };
    } catch (error) {
      console.error('Error fetching partnerships:', error?.message || error);
      return { items: [], total: 0, page: pageNumber, totalPages: 0 };
    }
  }

  @UseGuards(JwtAuthGuard)
  @Patch('partnerships/:id/status')
  async updatePartnershipStatus(@Param('id') id: string, @Body() updateStatusDto: UpdateStatusDto) {
    try {
      return await this.prisma.partnershipEnquiry.update({
        where: { id: parseInt(id, 10) },
        data: { status: updateStatusDto.status as any },
      });
    } catch (error) {
      console.error('Error updating partnership status:', error?.message || error);
      return { id: parseInt(id, 10), status: updateStatusDto.status };
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('audit-leads')
  async getAuditLeads(
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '10',
    @Query('search') search: string = '',
    @Query('status') status: string = '',
    @Query('startDate') startDate: string = '',
    @Query('endDate') endDate: string = '',
    @Query('emailOnly') emailOnly: string = 'true',
  ) {
    const pageNumber = Math.max(1, parseInt(page, 10) || 1);
    const limitNumber = Math.min(100, Math.max(1, parseInt(limit, 10) || 10));
    const skip = (pageNumber - 1) * limitNumber;

    try {
      const where: any = {};

      if (emailOnly !== 'false') {
        where.email = { not: null, notIn: [''] };
      }

      if (search && search.trim()) {
        const term = search.trim();
        where.OR = [
          { email: { contains: term, mode: 'insensitive' } },
          { url: { contains: term, mode: 'insensitive' } },
          { auditId: { contains: term, mode: 'insensitive' } },
        ];
      }

      if (status && status.trim()) {
        where.status = status.trim();
      }

      if (startDate || endDate) {
        where.createdAt = {};
        if (startDate) {
          where.createdAt.gte = new Date(startDate);
        }
        if (endDate) {
          const end = new Date(endDate);
          if (endDate.length === 10) {
            end.setHours(23, 59, 59, 999);
          }
          where.createdAt.lte = end;
        }
      }

      const [items, total] = await Promise.all([
        this.prisma.websiteAudit.findMany({
          where,
          skip,
          take: limitNumber,
          orderBy: { createdAt: 'desc' },
          select: {
            id: true,
            auditId: true,
            url: true,
            competitorUrl: true,
            email: true,
            status: true,
            overallScore: true,
            grade: true,
            errorMessage: true,
            createdAt: true,
            completedAt: true,
            reportJson: true,
          },
        }),
        this.prisma.websiteAudit.count({ where }),
      ]);

      const formattedItems = items.map((item) => {
        const report = item.reportJson as any;
        const salesNotif = report?.salesNotification;
        return {
          id: item.id,
          auditId: item.auditId,
          url: item.url,
          competitorUrl: item.competitorUrl,
          email: item.email,
          status: item.status,
          overallScore: item.overallScore,
          grade: item.grade,
          errorMessage: item.errorMessage,
          createdAt: item.createdAt,
          completedAt: item.completedAt,
          notificationStatus:
            salesNotif?.status || (item.email && item.status === 'COMPLETED' ? 'PENDING' : 'NOT_APPLICABLE'),
          notificationSentAt: salesNotif?.sentAt || null,
          notificationError: salesNotif?.error || null,
        };
      });

      return {
        items: formattedItems,
        total,
        page: pageNumber,
        totalPages: Math.ceil(total / limitNumber) || 1,
      };
    } catch (error) {
      console.error('Error fetching audit leads:', error?.message || error);
      return { items: [], total: 0, page: pageNumber, totalPages: 0 };
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('audit-leads/:id')
  async getAuditLeadDetail(@Param('id') id: string) {
    try {
      const isNumeric = /^\d+$/.test(id);
      const where = isNumeric ? { id: parseInt(id, 10) } : { auditId: id };

      const item = await this.prisma.websiteAudit.findUnique({
        where: where as any,
      });

      if (!item) {
        throw new NotFoundException(`Audit lead with identifier "${id}" not found.`);
      }

      const report = item.reportJson as any;
      const salesNotif = report?.salesNotification;

      return {
        id: item.id,
        auditId: item.auditId,
        url: item.url,
        competitorUrl: item.competitorUrl,
        email: item.email,
        status: item.status,
        overallScore: item.overallScore,
        grade: item.grade,
        errorMessage: item.errorMessage,
        createdAt: item.createdAt,
        updatedAt: item.updatedAt,
        completedAt: item.completedAt,
        categories: report?.categories || null,
        recommendations: report?.recommendations || [],
        technologyStack: report?.technologyStack || [],
        notificationStatus:
          salesNotif?.status || (item.email && item.status === 'COMPLETED' ? 'PENDING' : 'NOT_APPLICABLE'),
        notificationSentAt: salesNotif?.sentAt || null,
        notificationError: salesNotif?.error || null,
        reportSummary: {
          performance: report?.performance || null,
          seo: report?.seo ? { score: report.seo.score, title: report.seo.title } : null,
          security: report?.security ? { score: report.security.score } : null,
          mobile: report?.mobile ? { score: report.mobile.score } : null,
          accessibility: report?.accessibility ? { score: report.accessibility.score } : null,
        },
      };
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      console.error('Error fetching audit lead detail:', error?.message || error);
      throw new BadRequestException('Failed to retrieve audit lead details.');
    }
  }
}
