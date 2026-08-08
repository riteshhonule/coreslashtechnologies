import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '@database/prisma.service';
import { CacheService } from '@core/cache/cache.service';
import { CACHE_KEYS } from '@core/cache/cache.keys';
import { CACHE_TTL } from '@core/cache/cache.constants';
import { Status, JobStatus, InquiryStatus } from '@prisma/client';

@Injectable()
export class DashboardService {
  private readonly logger = new Logger(DashboardService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly cacheService: CacheService,
  ) {}

  /**
   * Get overall CMS dashboard statistics (Cached 60 seconds).
   */
  async getStats() {
    return this.cacheService.getOrSet(
      CACHE_KEYS.DASHBOARD_STATS,
      async () => {
        const [
          totalUsers,
          activeUsers,
          totalBlogs,
          publishedBlogs,
          draftBlogs,
          totalServices,
          activeServices,
          totalPortfolios,
          featuredPortfolios,
          totalCareers,
          openCareers,
          totalJobApplications,
          newApplications,
          totalInquiries,
          newInquiries,
          inProgressInquiries,
          archivedInquiries,
          totalSubscribers,
          activeSubscribers,
          totalMediaFiles,
        ] = await Promise.all([
          this.prisma.user.count({ where: { deletedAt: null } }),
          this.prisma.user.count({ where: { status: Status.ACTIVE, deletedAt: null } }),
          this.prisma.blog.count({ where: { deletedAt: null } }),
          this.prisma.blog.count({ where: { status: Status.PUBLISHED, deletedAt: null } }),
          this.prisma.blog.count({ where: { status: Status.DRAFT, deletedAt: null } }),
          this.prisma.service.count({ where: { deletedAt: null } }),
          this.prisma.service.count({ where: { status: Status.ACTIVE, deletedAt: null } }),
          this.prisma.portfolio.count({ where: { deletedAt: null } }),
          this.prisma.portfolio.count({ where: { featured: true, deletedAt: null } }),
          this.prisma.career.count({ where: { deletedAt: null } }),
          this.prisma.career.count({ where: { status: JobStatus.OPEN, deletedAt: null } }),
          this.prisma.jobApplication.count({ where: { deletedAt: null } }),
          this.prisma.jobApplication.count({ where: { status: InquiryStatus.NEW, deletedAt: null } }),
          this.prisma.contactInquiry.count({ where: { deletedAt: null } }),
          this.prisma.contactInquiry.count({ where: { status: InquiryStatus.NEW, deletedAt: null } }),
          this.prisma.contactInquiry.count({ where: { status: InquiryStatus.IN_PROGRESS, deletedAt: null } }),
          this.prisma.contactInquiry.count({ where: { isArchived: true, deletedAt: null } }),
          this.prisma.newsletterSubscriber.count({ where: { deletedAt: null } }),
          this.prisma.newsletterSubscriber.count({ where: { status: Status.ACTIVE, deletedAt: null } }),
          this.prisma.media.count({ where: { deletedAt: null } }),
        ]);

        return {
          users: { total: totalUsers, active: activeUsers },
          blogs: { total: totalBlogs, published: publishedBlogs, draft: draftBlogs },
          services: { total: totalServices, active: activeServices },
          portfolios: { total: totalPortfolios, featured: featuredPortfolios },
          careers: { total: totalCareers, open: openCareers },
          jobApplications: { total: totalJobApplications, new: newApplications },
          inquiries: {
            total: totalInquiries,
            new: newInquiries,
            inProgress: inProgressInquiries,
            archived: archivedInquiries,
          },
          newsletter: { total: totalSubscribers, active: activeSubscribers },
          media: { total: totalMediaFiles },
          updatedAt: new Date().toISOString(),
        };
      },
      CACHE_TTL.SHORT,
    );
  }

  /**
   * Get recent ActivityLogs.
   */
  async getRecentActivity(limit = 15) {
    return this.prisma.activityLog.findMany({
      take: Math.min(limit, 50),
      orderBy: { createdAt: 'desc' },
      include: {
        user: {
          select: { id: true, name: true, email: true, role: true },
        },
      },
    });
  }
}
