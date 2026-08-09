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
import { ActivityStatus, Status } from '@prisma/client';
import { CreatePortfolioCategoryDto } from './dto/create-portfolio-category.dto';
import { CreatePortfolioDto } from './dto/create-portfolio.dto';
import { UpdatePortfolioDto } from './dto/update-portfolio.dto';
import { PaginationQueryDto } from '@common/dto/pagination-query.dto';
import { buildPaginatedResponse, IPaginatedResult, sanitizeSort, sanitizeSearch } from '@common/helpers/pagination.helper';
import { slugify } from '@common/helpers/slug.helper';

@Injectable()
export class PortfolioService {
  private readonly logger = new Logger(PortfolioService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly cacheService: CacheService,
  ) {}

  // --- CATEGORIES ---
  async findAllCategories() {
    return this.cacheService.getOrSet(
      CACHE_KEYS.PORTFOLIO_CATEGORIES,
      async () => {
        return this.prisma.portfolioCategory.findMany({
          where: { deletedAt: null },
          orderBy: { name: 'asc' },
          include: {
            _count: {
              select: { portfolios: true },
            },
          },
        });
      },
      CACHE_TTL.LONG,
    );
  }

  async createCategory(dto: CreatePortfolioCategoryDto, userId?: number) {
    const slug = dto.slug ? slugify(dto.slug) : slugify(dto.name);
    const existing = await this.prisma.portfolioCategory.findFirst({
      where: { slug, deletedAt: null },
    });
    if (existing) {
      throw new ConflictException(`Portfolio category with slug "${slug}" already exists`);
    }

    const category = await this.prisma.portfolioCategory.create({
      data: {
        name: dto.name.trim(),
        slug,
        createdBy: userId || null,
      },
    });

    await this.cacheService.delete(CACHE_KEYS.PORTFOLIO_CATEGORIES);
    return category;
  }

  // --- PORTFOLIO ITEMS ---
  async create(createPortfolioDto: CreatePortfolioDto, userId?: number) {
    const slug = createPortfolioDto.slug
      ? slugify(createPortfolioDto.slug)
      : slugify(createPortfolioDto.title);

    const existing = await this.prisma.portfolio.findFirst({
      where: { slug, deletedAt: null },
    });
    if (existing) {
      throw new ConflictException(`Portfolio item with slug "${slug}" already exists`);
    }

    const category = await this.prisma.portfolioCategory.findFirst({
      where: { id: createPortfolioDto.categoryId, deletedAt: null },
    });
    if (!category) {
      throw new BadRequestException(`Category #${createPortfolioDto.categoryId} does not exist`);
    }

    const item = await this.prisma.portfolio.create({
      data: {
        ...createPortfolioDto,
        slug,
        completionDate: createPortfolioDto.completionDate
          ? new Date(createPortfolioDto.completionDate)
          : null,
        authorId: userId || null,
        createdBy: userId || null,
      },
      include: {
        category: true,
        coverImage: true,
        clientLogo: true,
      },
    });

    await this.cacheService.invalidate(CACHE_KEYS.PORTFOLIO_PATTERN);

    if (userId) {
      await this.prisma.activityLog.create({
        data: {
          userId,
          action: 'PORTFOLIO_CREATE',
          module: 'PORTFOLIO',
          recordId: item.id,
          description: `Created portfolio item: ${item.title}`,
          status: ActivityStatus.SUCCESS,
        },
      });
    }

    return item;
  }

  async findAll(query: PaginationQueryDto): Promise<IPaginatedResult<any>> {
    const page = Number(query.page) || 1;
    const limit = Number(query.limit) || 10;
    const skip = (page - 1) * limit;

    const sortBy = sanitizeSort(query.sortBy, ['createdAt', 'updatedAt', 'title', 'completionDate', 'status'], 'createdAt');
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
        { description: { contains: search, mode: 'insensitive' } },
        { client: { contains: search, mode: 'insensitive' } },
        { industry: { contains: search, mode: 'insensitive' } },
      ];
    }

    const [items, total] = await Promise.all([
      this.prisma.portfolio.findMany({
        where,
        skip,
        take: limit,
        orderBy: { [sortBy]: query.sortOrder || 'desc' },
        include: {
          category: true,
          coverImage: true,
          clientLogo: true,
        },
      }),
      this.prisma.portfolio.count({ where }),
    ]);

    return buildPaginatedResponse(items, total, page, limit);
  }

  async findOne(idOrSlug: string) {
    const isId = /^\d+$/.test(idOrSlug);
    const cacheKey = CACHE_KEYS.PORTFOLIO(idOrSlug);

    return this.cacheService.getOrSet(
      cacheKey,
      async () => {
        const where: any = { deletedAt: null };
        if (isId) {
          where.id = parseInt(idOrSlug, 10);
        } else {
          where.slug = idOrSlug;
        }

        const item = await this.prisma.portfolio.findFirst({
          where,
          include: {
            category: true,
            author: {
              select: { id: true, name: true, email: true },
            },
            coverImage: true,
            clientLogo: true,
          },
        });

        if (!item) {
          throw new NotFoundException(`Portfolio item "${idOrSlug}" not found`);
        }

        return item;
      },
      CACHE_TTL.LONG,
    );
  }

  async update(id: number, updatePortfolioDto: UpdatePortfolioDto, userId?: number) {
    const item = await this.prisma.portfolio.findFirst({
      where: { id, deletedAt: null },
    });
    if (!item) {
      throw new NotFoundException(`Portfolio item #${id} not found`);
    }

    let slug = item.slug;
    if (updatePortfolioDto.slug || updatePortfolioDto.title) {
      const targetSlug = updatePortfolioDto.slug
        ? slugify(updatePortfolioDto.slug)
        : slugify(updatePortfolioDto.title || item.title);

      if (targetSlug !== item.slug) {
        const duplicate = await this.prisma.portfolio.findFirst({
          where: { slug: targetSlug, id: { not: id }, deletedAt: null },
        });
        if (duplicate) {
          throw new ConflictException(`Portfolio item with slug "${targetSlug}" already exists`);
        }
        slug = targetSlug;
      }
    }

    const updated = await this.prisma.portfolio.update({
      where: { id },
      data: {
        ...updatePortfolioDto,
        slug,
        completionDate: updatePortfolioDto.completionDate
          ? new Date(updatePortfolioDto.completionDate)
          : undefined,
        updatedBy: userId || null,
      },
      include: {
        category: true,
        coverImage: true,
        clientLogo: true,
      },
    });

    await this.cacheService.delete(CACHE_KEYS.PORTFOLIO(id));
    await this.cacheService.delete(CACHE_KEYS.PORTFOLIO(item.slug));
    await this.cacheService.invalidate(CACHE_KEYS.PORTFOLIO_PATTERN);

    if (userId) {
      await this.prisma.activityLog.create({
        data: {
          userId,
          action: 'PORTFOLIO_UPDATE',
          module: 'PORTFOLIO',
          recordId: id,
          description: `Updated portfolio item: ${updated.title}`,
          status: ActivityStatus.SUCCESS,
        },
      });
    }

    return updated;
  }

  async remove(id: number, userId?: number) {
    const item = await this.prisma.portfolio.findFirst({
      where: { id, deletedAt: null },
    });
    if (!item) {
      throw new NotFoundException(`Portfolio item #${id} not found`);
    }

    await this.prisma.portfolio.update({
      where: { id },
      data: {
        deletedAt: new Date(),
        status: Status.ARCHIVED,
        updatedBy: userId || null,
      },
    });

    await this.cacheService.delete(CACHE_KEYS.PORTFOLIO(id));
    await this.cacheService.delete(CACHE_KEYS.PORTFOLIO(item.slug));
    await this.cacheService.invalidate(CACHE_KEYS.PORTFOLIO_PATTERN);

    if (userId) {
      await this.prisma.activityLog.create({
        data: {
          userId,
          action: 'PORTFOLIO_DELETE',
          module: 'PORTFOLIO',
          recordId: id,
          description: `Soft deleted portfolio item #${id}`,
          status: ActivityStatus.SUCCESS,
        },
      });
    }

    return { message: `Portfolio item #${id} deleted successfully` };
  }
}
