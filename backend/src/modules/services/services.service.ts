import {
  Injectable,
  NotFoundException,
  ConflictException,
  Logger,
} from '@nestjs/common';
import { PrismaService } from '@database/prisma.service';
import { CacheService } from '@core/cache/cache.service';
import { CACHE_KEYS } from '@core/cache/cache.keys';
import { CACHE_TTL } from '@core/cache/cache.constants';
import { ActivityStatus, Status } from '@prisma/client';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { PaginationQueryDto } from '@common/dto/pagination-query.dto';
import { buildPaginatedResponse, IPaginatedResult, sanitizeSort, sanitizeSearch } from '@common/helpers/pagination.helper';
import { slugify } from '@common/helpers/slug.helper';

@Injectable()
export class ServicesService {
  private readonly logger = new Logger(ServicesService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly cacheService: CacheService,
  ) {}

  /**
   * Create new Service.
   */
  async create(createServiceDto: CreateServiceDto, userId?: number) {
    const slug = createServiceDto.slug
      ? slugify(createServiceDto.slug)
      : slugify(createServiceDto.title);

    // Check slug uniqueness
    const existing = await this.prisma.service.findFirst({
      where: { slug, deletedAt: null },
    });
    if (existing) {
      throw new ConflictException(`Service with slug "${slug}" already exists`);
    }

    const service = await this.prisma.service.create({
      data: {
        ...createServiceDto,
        slug,
        createdBy: userId || null,
      },
      include: {
        heroImage: true,
        bannerImage: true,
      },
    });

    await this.cacheService.invalidate(CACHE_KEYS.SERVICES_PATTERN);

    if (userId) {
      await this.prisma.activityLog.create({
        data: {
          userId,
          action: 'SERVICE_CREATE',
          module: 'SERVICES',
          recordId: service.id,
          description: `Created service: ${service.title}`,
          status: ActivityStatus.SUCCESS,
        },
      });
    }

    return service;
  }

  /**
   * Find all services (Paginated).
   */
  async findAll(query: PaginationQueryDto): Promise<IPaginatedResult<any>> {
    const page = Number(query.page) || 1;
    const limit = Number(query.limit) || 10;
    const skip = (page - 1) * limit;

    const sortBy = sanitizeSort(query.sortBy, ['displayOrder', 'createdAt', 'updatedAt', 'title', 'status'], 'displayOrder');
    const search = sanitizeSearch(query.search);

    const where: any = {
      deletedAt: null,
    };

    if (query.status) {
      where.status = query.status as Status;
    }

    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { shortDescription: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
      ];
    }

    const [items, total] = await Promise.all([
      this.prisma.service.findMany({
        where,
        skip,
        take: limit,
        orderBy: { [sortBy]: query.sortOrder || 'asc' },
        include: {
          heroImage: true,
          bannerImage: true,
        },
      }),
      this.prisma.service.count({ where }),
    ]);

    return buildPaginatedResponse(items, total, page, limit);
  }

  /**
   * Find single service by ID or Slug.
   */
  async findOne(idOrSlug: string) {
    const isId = /^\d+$/.test(idOrSlug);
    const cacheKey = CACHE_KEYS.SERVICE(idOrSlug);

    return this.cacheService.getOrSet(
      cacheKey,
      async () => {
        const where: any = { deletedAt: null };
        if (isId) {
          where.id = parseInt(idOrSlug, 10);
        } else {
          where.slug = idOrSlug;
        }

        const service = await this.prisma.service.findFirst({
          where,
          include: {
            heroImage: true,
            bannerImage: true,
          },
        });

        if (!service) {
          throw new NotFoundException(`Service "${idOrSlug}" not found`);
        }

        return service;
      },
      CACHE_TTL.LONG,
    );
  }

  /**
   * Update service.
   */
  async update(id: number, updateServiceDto: UpdateServiceDto, userId?: number) {
    const service = await this.prisma.service.findFirst({
      where: { id, deletedAt: null },
    });
    if (!service) {
      throw new NotFoundException(`Service #${id} not found`);
    }

    let slug = service.slug;
    if (updateServiceDto.slug || updateServiceDto.title) {
      const targetSlug = updateServiceDto.slug
        ? slugify(updateServiceDto.slug)
        : slugify(updateServiceDto.title || service.title);

      if (targetSlug !== service.slug) {
        const duplicate = await this.prisma.service.findFirst({
          where: { slug: targetSlug, id: { not: id }, deletedAt: null },
        });
        if (duplicate) {
          throw new ConflictException(`Service with slug "${targetSlug}" already exists`);
        }
        slug = targetSlug;
      }
    }

    const updated = await this.prisma.service.update({
      where: { id },
      data: {
        ...updateServiceDto,
        slug,
        updatedBy: userId || null,
      },
      include: {
        heroImage: true,
        bannerImage: true,
      },
    });

    await this.cacheService.delete(CACHE_KEYS.SERVICE(id));
    await this.cacheService.delete(CACHE_KEYS.SERVICE(service.slug));
    await this.cacheService.invalidate(CACHE_KEYS.SERVICES_PATTERN);

    if (userId) {
      await this.prisma.activityLog.create({
        data: {
          userId,
          action: 'SERVICE_UPDATE',
          module: 'SERVICES',
          recordId: id,
          description: `Updated service: ${updated.title}`,
          status: ActivityStatus.SUCCESS,
        },
      });
    }

    return updated;
  }

  /**
   * Soft delete service.
   */
  async remove(id: number, userId?: number) {
    const service = await this.prisma.service.findFirst({
      where: { id, deletedAt: null },
    });
    if (!service) {
      throw new NotFoundException(`Service #${id} not found`);
    }

    await this.prisma.service.update({
      where: { id },
      data: {
        deletedAt: new Date(),
        status: Status.INACTIVE,
        updatedBy: userId || null,
      },
    });

    await this.cacheService.delete(CACHE_KEYS.SERVICE(id));
    await this.cacheService.delete(CACHE_KEYS.SERVICE(service.slug));
    await this.cacheService.invalidate(CACHE_KEYS.SERVICES_PATTERN);

    if (userId) {
      await this.prisma.activityLog.create({
        data: {
          userId,
          action: 'SERVICE_DELETE',
          module: 'SERVICES',
          recordId: id,
          description: `Soft deleted service #${id}`,
          status: ActivityStatus.SUCCESS,
        },
      });
    }

    return { message: `Service #${id} deleted successfully` };
  }
}
