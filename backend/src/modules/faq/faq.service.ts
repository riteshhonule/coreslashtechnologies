import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { PrismaService } from '@database/prisma.service';
import { CacheService } from '@core/cache/cache.service';
import { CACHE_KEYS } from '@core/cache/cache.keys';
import { CACHE_TTL } from '@core/cache/cache.constants';
import { ActivityStatus, Status } from '@prisma/client';
import { CreateFaqDto } from './dto/create-faq.dto';
import { UpdateFaqDto } from './dto/update-faq.dto';
import { PaginationQueryDto } from '@common/dto/pagination-query.dto';
import { buildPaginatedResponse, IPaginatedResult, sanitizeSort, sanitizeSearch } from '@common/helpers/pagination.helper';

@Injectable()
export class FaqService {
  private readonly logger = new Logger(FaqService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly cacheService: CacheService,
  ) {}

  async create(createFaqDto: CreateFaqDto, userId?: number) {
    const faq = await this.prisma.fAQ.create({
      data: {
        ...createFaqDto,
        createdBy: userId || null,
      },
    });

    await this.cacheService.invalidate(CACHE_KEYS.FAQ_PATTERN);

    if (userId) {
      await this.prisma.activityLog.create({
        data: {
          userId,
          action: 'FAQ_CREATE',
          module: 'FAQ',
          recordId: faq.id,
          description: `Created FAQ #${faq.id}: "${faq.question}"`,
          status: ActivityStatus.SUCCESS,
        },
      });
    }

    return faq;
  }

  async findAll(query: PaginationQueryDto & { pageName?: string }): Promise<IPaginatedResult<any>> {
    const page = Number(query.page) || 1;
    const limit = Number(query.limit) || 10;
    const skip = (page - 1) * limit;

    const sortBy = sanitizeSort(query.sortBy, ['displayOrder', 'createdAt', 'updatedAt', 'question', 'status'], 'displayOrder');
    const search = sanitizeSearch(query.search);

    const where: any = {
      deletedAt: null,
    };

    if (query.status) {
      where.status = query.status as Status;
    }

    if (query.pageName) {
      where.page = query.pageName;
    }

    if (search) {
      where.OR = [
        { question: { contains: search, mode: 'insensitive' } },
        { answer: { contains: search, mode: 'insensitive' } },
      ];
    }

    const [items, total] = await Promise.all([
      this.prisma.fAQ.findMany({
        where,
        skip,
        take: limit,
        orderBy: { [sortBy]: query.sortOrder || 'asc' },
      }),
      this.prisma.fAQ.count({ where }),
    ]);

    return buildPaginatedResponse(items, total, page, limit);
  }

  async findOne(id: number) {
    const cacheKey = CACHE_KEYS.FAQ(id);

    return this.cacheService.getOrSet(
      cacheKey,
      async () => {
        const faq = await this.prisma.fAQ.findFirst({
          where: { id, deletedAt: null },
        });

        if (!faq) {
          throw new NotFoundException(`FAQ #${id} not found`);
        }

        return faq;
      },
      CACHE_TTL.LONG,
    );
  }

  async update(id: number, updateFaqDto: UpdateFaqDto, userId?: number) {
    await this.findOne(id); // Ensure exists

    const updated = await this.prisma.fAQ.update({
      where: { id },
      data: {
        ...updateFaqDto,
        updatedBy: userId || null,
      },
    });

    await this.cacheService.delete(CACHE_KEYS.FAQ(id));
    await this.cacheService.invalidate(CACHE_KEYS.FAQ_PATTERN);

    if (userId) {
      await this.prisma.activityLog.create({
        data: {
          userId,
          action: 'FAQ_UPDATE',
          module: 'FAQ',
          recordId: id,
          description: `Updated FAQ #${id}`,
          status: ActivityStatus.SUCCESS,
        },
      });
    }

    return updated;
  }

  async remove(id: number, userId?: number) {
    await this.findOne(id); // Ensure exists

    await this.prisma.fAQ.update({
      where: { id },
      data: {
        deletedAt: new Date(),
        status: Status.INACTIVE,
        updatedBy: userId || null,
      },
    });

    await this.cacheService.delete(CACHE_KEYS.FAQ(id));
    await this.cacheService.invalidate(CACHE_KEYS.FAQ_PATTERN);

    if (userId) {
      await this.prisma.activityLog.create({
        data: {
          userId,
          action: 'FAQ_DELETE',
          module: 'FAQ',
          recordId: id,
          description: `Soft deleted FAQ #${id}`,
          status: ActivityStatus.SUCCESS,
        },
      });
    }

    return { message: `FAQ #${id} deleted successfully` };
  }
}
