import {
  Injectable,
  NotFoundException,
  ConflictException,
  BadRequestException,
  Logger,
} from '@nestjs/common';
import { PrismaService } from '@database/prisma.service';
import { CacheService } from '@core/cache/cache.service';
import { CACHE_KEYS } from '@core/cache/cache.keys';
import { CACHE_TTL } from '@core/cache/cache.constants';
import { NotificationService } from '../notifications/notification.service';
import { ActivityStatus, JobStatus, InquiryStatus } from '@prisma/client';
import { CreateCareerDto } from './dto/create-career.dto';
import { UpdateCareerDto } from './dto/update-career.dto';
import { CreateJobApplicationDto } from './dto/create-job-application.dto';
import { UpdateJobApplicationDto } from './dto/update-job-application.dto';
import { PaginationQueryDto } from '@common/dto/pagination-query.dto';
import { buildPaginatedResponse, IPaginatedResult, sanitizeSort, sanitizeSearch } from '@common/helpers/pagination.helper';
import { slugify } from '@common/helpers/slug.helper';

@Injectable()
export class CareersService {
  private readonly logger = new Logger(CareersService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly cacheService: CacheService,
    private readonly notificationService: NotificationService,
  ) {}

  // --- CAREER POSITIONS ---
  async create(dto: CreateCareerDto, userId?: number) {
    const slug = dto.slug ? slugify(dto.slug) : slugify(dto.title);

    const existing = await this.prisma.career.findFirst({
      where: { slug, deletedAt: null },
    });
    if (existing) {
      throw new ConflictException(`Career position with slug "${slug}" already exists`);
    }

    const career = await this.prisma.career.create({
      data: {
        ...dto,
        slug,
        createdBy: userId || null,
      },
    });

    await this.cacheService.invalidate(CACHE_KEYS.CAREER_PATTERN);

    if (userId) {
      await this.prisma.activityLog.create({
        data: {
          userId,
          action: 'CAREER_CREATE',
          module: 'CAREERS',
          recordId: career.id,
          description: `Created career opening: ${career.title}`,
          status: ActivityStatus.SUCCESS,
        },
      });
    }

    return career;
  }

  async findAll(query: PaginationQueryDto): Promise<IPaginatedResult<any>> {
    const page = Number(query.page) || 1;
    const limit = Number(query.limit) || 10;
    const skip = (page - 1) * limit;

    const sortBy = sanitizeSort(query.sortBy, ['createdAt', 'updatedAt', 'title', 'department', 'location', 'status'], 'createdAt');
    const search = sanitizeSearch(query.search);

    const where: any = {
      deletedAt: null,
    };

    if (query.status) {
      where.status = query.status as JobStatus;
    }

    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { department: { contains: search, mode: 'insensitive' } },
        { location: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
      ];
    }

    const [items, total] = await Promise.all([
      this.prisma.career.findMany({
        where,
        skip,
        take: limit,
        orderBy: { [sortBy]: query.sortOrder || 'desc' },
        include: {
          _count: {
            select: { jobApplications: true },
          },
        },
      }),
      this.prisma.career.count({ where }),
    ]);

    return buildPaginatedResponse(items, total, page, limit);
  }

  async findOne(idOrSlug: string) {
    const isId = /^\d+$/.test(idOrSlug);
    const cacheKey = CACHE_KEYS.CAREER(idOrSlug);

    return this.cacheService.getOrSet(
      cacheKey,
      async () => {
        const where: any = { deletedAt: null };
        if (isId) {
          where.id = parseInt(idOrSlug, 10);
        } else {
          where.slug = idOrSlug;
        }

        const career = await this.prisma.career.findFirst({
          where,
          include: {
            _count: {
              select: { jobApplications: true },
            },
          },
        });

        if (!career) {
          throw new NotFoundException(`Career opening "${idOrSlug}" not found`);
        }

        return career;
      },
      CACHE_TTL.LONG,
    );
  }

  async update(id: number, dto: UpdateCareerDto, userId?: number) {
    const career = await this.prisma.career.findFirst({
      where: { id, deletedAt: null },
    });
    if (!career) {
      throw new NotFoundException(`Career opening #${id} not found`);
    }

    let slug = career.slug;
    if (dto.slug || dto.title) {
      const targetSlug = dto.slug ? slugify(dto.slug) : slugify(dto.title || career.title);
      if (targetSlug !== career.slug) {
        const duplicate = await this.prisma.career.findFirst({
          where: { slug: targetSlug, id: { not: id }, deletedAt: null },
        });
        if (duplicate) {
          throw new ConflictException(`Career position with slug "${targetSlug}" already exists`);
        }
        slug = targetSlug;
      }
    }

    const updated = await this.prisma.career.update({
      where: { id },
      data: {
        ...dto,
        slug,
        updatedBy: userId || null,
      },
    });

    await this.cacheService.delete(CACHE_KEYS.CAREER(id));
    await this.cacheService.delete(CACHE_KEYS.CAREER(career.slug));
    await this.cacheService.invalidate(CACHE_KEYS.CAREER_PATTERN);

    if (userId) {
      await this.prisma.activityLog.create({
        data: {
          userId,
          action: 'CAREER_UPDATE',
          module: 'CAREERS',
          recordId: id,
          description: `Updated career opening: ${updated.title}`,
          status: ActivityStatus.SUCCESS,
        },
      });
    }

    return updated;
  }

  async remove(id: number, userId?: number) {
    const career = await this.prisma.career.findFirst({
      where: { id, deletedAt: null },
    });
    if (!career) {
      throw new NotFoundException(`Career opening #${id} not found`);
    }

    await this.prisma.career.update({
      where: { id },
      data: {
        deletedAt: new Date(),
        status: JobStatus.CLOSED,
        updatedBy: userId || null,
      },
    });

    await this.cacheService.delete(CACHE_KEYS.CAREER(id));
    await this.cacheService.delete(CACHE_KEYS.CAREER(career.slug));
    await this.cacheService.invalidate(CACHE_KEYS.CAREER_PATTERN);

    if (userId) {
      await this.prisma.activityLog.create({
        data: {
          userId,
          action: 'CAREER_DELETE',
          module: 'CAREERS',
          recordId: id,
          description: `Soft deleted career opening #${id}`,
          status: ActivityStatus.SUCCESS,
        },
      });
    }

    return { message: `Career opening #${id} deleted successfully` };
  }

  // --- JOB APPLICATIONS ---
  async apply(
    dto: CreateJobApplicationDto,
    file: Express.Multer.File,
  ) {
    if (!file) {
      throw new BadRequestException('Resume document file is required for job applications');
    }

    const career = await this.prisma.career.findFirst({
      where: { id: dto.careerId, deletedAt: null },
    });
    if (!career) {
      throw new NotFoundException(`Career opening #${dto.careerId} not found`);
    }

    if (career.status !== JobStatus.OPEN) {
      throw new BadRequestException(`Career opening "${career.title}" is no longer accepting applications`);
    }

    const resumePath = `resumes/${file.filename}`;

    const application = await this.prisma.jobApplication.create({
      data: {
        careerId: dto.careerId,
        fullName: dto.fullName.trim(),
        email: dto.email.trim().toLowerCase(),
        phone: dto.phone.trim(),
        resume: resumePath,
        coverLetter: dto.coverLetter || null,
        status: InquiryStatus.NEW,
      },
      include: {
        career: true,
      },
    });

    // Enqueue background email alert for HR/Admins
    try {
      await this.notificationService.queueNotification({
        type: 'EMAIL',
        template: 'system/security-alert',
        recipient: process.env.HR_EMAIL || 'careers@coreslash.com',
        subject: `New Job Application: ${application.fullName} for ${career.title}`,
        data: {
          subject: `New Application for ${career.title}`,
          message: `Applicant ${application.fullName} (${application.email}, ${application.phone}) applied for ${career.title}.`,
        },
        eventId: `app_${application.id}`,
      });
    } catch (err) {
      this.logger.warn(`Failed to enqueue job application alert notification: ${err}`);
    }

    return {
      message: 'Job application submitted successfully',
      applicationId: application.id,
    };
  }

  async findApplicationById(id: number) {
    const application = await this.prisma.jobApplication.findFirst({
      where: { id, deletedAt: null },
      include: { career: true },
    });
    if (!application) {
      throw new NotFoundException(`Job application #${id} not found`);
    }
    return application;
  }

  async findAllApplications(query: PaginationQueryDto, careerId?: number): Promise<IPaginatedResult<any>> {
    const page = Number(query.page) || 1;
    const limit = Number(query.limit) || 10;
    const skip = (page - 1) * limit;

    const sortBy = sanitizeSort(query.sortBy, ['createdAt', 'updatedAt', 'fullName', 'email', 'status'], 'createdAt');
    const search = sanitizeSearch(query.search);

    const where: any = {
      deletedAt: null,
    };

    if (careerId) {
      where.careerId = careerId;
    }

    if (query.status) {
      where.status = query.status as InquiryStatus;
    }

    if (search) {
      where.OR = [
        { fullName: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } },
        { phone: { contains: search, mode: 'insensitive' } },
      ];
    }

    const [items, total] = await Promise.all([
      this.prisma.jobApplication.findMany({
        where,
        skip,
        take: limit,
        orderBy: { [sortBy]: query.sortOrder || 'desc' },
        include: {
          career: {
            select: { id: true, title: true, department: true, location: true },
          },
        },
      }),
      this.prisma.jobApplication.count({ where }),
    ]);

    return buildPaginatedResponse(items, total, page, limit);
  }

  async updateApplicationStatus(id: number, dto: UpdateJobApplicationDto, userId?: number) {
    const application = await this.findApplicationById(id);

    const updated = await this.prisma.jobApplication.update({
      where: { id },
      data: {
        status: dto.status || application.status,
        updatedBy: userId || null,
      },
      include: {
        career: true,
      },
    });

    if (userId) {
      await this.prisma.activityLog.create({
        data: {
          userId,
          action: 'JOB_APPLICATION_UPDATE',
          module: 'CAREERS',
          recordId: id,
          description: `Updated status for job application #${id} (${updated.fullName}) to ${updated.status}`,
          status: ActivityStatus.SUCCESS,
        },
      });
    }

    return updated;
  }
}
