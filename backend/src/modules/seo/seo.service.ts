import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { PrismaService } from '@database/prisma.service';
import { CacheService } from '@core/cache/cache.service';
import { CACHE_KEYS } from '@core/cache/cache.keys';
import { CACHE_TTL } from '@core/cache/cache.constants';
import { ActivityStatus } from '@prisma/client';
import { CreateSeoMetaDto } from './dto/create-seo-meta.dto';
import { UpdateSeoMetaDto } from './dto/update-seo-meta.dto';
import { PaginationQueryDto } from '@common/dto/pagination-query.dto';
import { buildPaginatedResponse, IPaginatedResult, sanitizeSort, sanitizeSearch } from '@common/helpers/pagination.helper';

@Injectable()
export class SeoService {
  private readonly logger = new Logger(SeoService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly cacheService: CacheService,
  ) {}

  async create(dto: CreateSeoMetaDto, userId?: number) {
    const pageKey = dto.page.toLowerCase();

    const existing = await this.prisma.seoMeta.findFirst({
      where: { page: pageKey, pageId: dto.pageId || null, deletedAt: null },
    });

    let seoMeta;
    if (existing) {
      seoMeta = await this.prisma.seoMeta.update({
        where: { id: existing.id },
        data: {
          ...dto,
          page: pageKey,
          lastModified: new Date(),
          updatedBy: userId || null,
        },
        include: {
          ogImage: true,
          twitterImage: true,
        },
      });
    } else {
      seoMeta = await this.prisma.seoMeta.create({
        data: {
          ...dto,
          page: pageKey,
          lastModified: new Date(),
          createdBy: userId || null,
        },
        include: {
          ogImage: true,
          twitterImage: true,
        },
      });
    }

    await this.cacheService.delete(CACHE_KEYS.SEO_PAGE(pageKey));
    await this.cacheService.invalidate(CACHE_KEYS.SEO_PATTERN);

    if (userId) {
      await this.prisma.activityLog.create({
        data: {
          userId,
          action: 'SEO_UPDATE',
          module: 'SEO',
          recordId: seoMeta.id,
          description: `Updated SEO meta for page: ${pageKey}`,
          status: ActivityStatus.SUCCESS,
        },
      });
    }

    return seoMeta;
  }

  async findByPage(pageName: string, pageId?: number) {
    const key = pageId ? `${pageName}_${pageId}` : pageName;
    const cacheKey = CACHE_KEYS.SEO_PAGE(key);

    return this.cacheService.getOrSet(
      cacheKey,
      async () => {
        const seoMeta = await this.prisma.seoMeta.findFirst({
          where: {
            page: pageName.toLowerCase(),
            pageId: pageId || null,
            deletedAt: null,
          },
          include: {
            ogImage: true,
            twitterImage: true,
          },
        });

        if (!seoMeta) {
          return {
            page: pageName,
            title: 'CoreSlash Technologies',
            description: 'Leading Software Development & CMS Solutions',
            robots: 'index, follow',
          };
        }

        return seoMeta;
      },
      CACHE_TTL.VERY_LONG,
    );
  }

  async findAll(query: PaginationQueryDto): Promise<IPaginatedResult<any>> {
    const page = Number(query.page) || 1;
    const limit = Number(query.limit) || 10;
    const skip = (page - 1) * limit;

    const sortBy = sanitizeSort(query.sortBy, ['createdAt', 'updatedAt', 'page', 'lastModified'], 'createdAt');
    const search = sanitizeSearch(query.search);

    const where: any = {
      deletedAt: null,
    };

    if (search) {
      where.OR = [
        { page: { contains: search, mode: 'insensitive' } },
        { title: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
      ];
    }

    const [items, total] = await Promise.all([
      this.prisma.seoMeta.findMany({
        where,
        skip,
        take: limit,
        orderBy: { [sortBy]: query.sortOrder || 'desc' },
        include: {
          ogImage: true,
          twitterImage: true,
        },
      }),
      this.prisma.seoMeta.count({ where }),
    ]);

    return buildPaginatedResponse(items, total, page, limit);
  }

  async update(id: number, dto: UpdateSeoMetaDto, userId?: number) {
    const existing = await this.prisma.seoMeta.findFirst({
      where: { id, deletedAt: null },
    });
    if (!existing) {
      throw new NotFoundException(`SEO Meta #${id} not found`);
    }

    const updated = await this.prisma.seoMeta.update({
      where: { id },
      data: {
        ...dto,
        lastModified: new Date(),
        updatedBy: userId || null,
      },
      include: {
        ogImage: true,
        twitterImage: true,
      },
    });

    await this.cacheService.delete(CACHE_KEYS.SEO_PAGE(existing.page));
    await this.cacheService.invalidate(CACHE_KEYS.SEO_PATTERN);

    if (userId) {
      await this.prisma.activityLog.create({
        data: {
          userId,
          action: 'SEO_UPDATE',
          module: 'SEO',
          recordId: id,
          description: `Updated SEO Meta #${id}`,
          status: ActivityStatus.SUCCESS,
        },
      });
    }

    return updated;
  }

  async remove(id: number, userId?: number) {
    const existing = await this.prisma.seoMeta.findFirst({
      where: { id, deletedAt: null },
    });
    if (!existing) {
      throw new NotFoundException(`SEO Meta #${id} not found`);
    }

    await this.prisma.seoMeta.update({
      where: { id },
      data: {
        deletedAt: new Date(),
        updatedBy: userId || null,
      },
    });

    await this.cacheService.delete(CACHE_KEYS.SEO_PAGE(existing.page));
    await this.cacheService.invalidate(CACHE_KEYS.SEO_PATTERN);

    if (userId) {
      await this.prisma.activityLog.create({
        data: {
          userId,
          action: 'SEO_DELETE',
          module: 'SEO',
          recordId: id,
          description: `Soft deleted SEO Meta #${id}`,
          status: ActivityStatus.SUCCESS,
        },
      });
    }

    return { message: `SEO Meta #${id} deleted successfully` };
  }
}
