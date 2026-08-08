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
import { CreateBlogCategoryDto } from './dto/create-blog-category.dto';
import { UpdateBlogCategoryDto } from './dto/update-blog-category.dto';
import { slugify } from '@common/helpers/slug.helper';

@Injectable()
export class BlogCategoriesService {
  private readonly logger = new Logger(BlogCategoriesService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly cacheService: CacheService,
  ) {}

  /**
   * Create new Blog Category.
   */
  async create(dto: CreateBlogCategoryDto, userId?: number) {
    const slug = dto.slug ? slugify(dto.slug) : slugify(dto.name);

    const existing = await this.prisma.blogCategory.findFirst({
      where: { slug, deletedAt: null },
    });
    if (existing) {
      throw new ConflictException(`Blog category with slug "${slug}" already exists`);
    }

    const category = await this.prisma.blogCategory.create({
      data: {
        ...dto,
        slug,
        createdBy: userId || null,
      },
    });

    await this.cacheService.delete(CACHE_KEYS.BLOG_CATEGORIES);

    if (userId) {
      await this.prisma.activityLog.create({
        data: {
          userId,
          action: 'BLOG_CATEGORY_CREATE',
          module: 'BLOG',
          recordId: category.id,
          description: `Created blog category: ${category.name}`,
          status: ActivityStatus.SUCCESS,
        },
      });
    }

    return category;
  }

  /**
   * Find all active blog categories.
   */
  async findAll() {
    return this.cacheService.getOrSet(
      CACHE_KEYS.BLOG_CATEGORIES,
      async () => {
        return this.prisma.blogCategory.findMany({
          where: { deletedAt: null },
          orderBy: { name: 'asc' },
          include: {
            _count: {
              select: { blogs: true },
            },
          },
        });
      },
      CACHE_TTL.LONG,
    );
  }

  /**
   * Find single blog category by ID or Slug.
   */
  async findOne(idOrSlug: string) {
    const isId = /^\d+$/.test(idOrSlug);
    const where: any = { deletedAt: null };
    if (isId) {
      where.id = parseInt(idOrSlug, 10);
    } else {
      where.slug = idOrSlug;
    }

    const category = await this.prisma.blogCategory.findFirst({
      where,
      include: {
        _count: {
          select: { blogs: true },
        },
      },
    });

    if (!category) {
      throw new NotFoundException(`Blog category "${idOrSlug}" not found`);
    }

    return category;
  }

  /**
   * Update blog category.
   */
  async update(id: number, dto: UpdateBlogCategoryDto, userId?: number) {
    const category = await this.prisma.blogCategory.findFirst({
      where: { id, deletedAt: null },
    });
    if (!category) {
      throw new NotFoundException(`Blog category #${id} not found`);
    }

    let slug = category.slug;
    if (dto.slug || dto.name) {
      const targetSlug = dto.slug ? slugify(dto.slug) : slugify(dto.name || category.name);
      if (targetSlug !== category.slug) {
        const duplicate = await this.prisma.blogCategory.findFirst({
          where: { slug: targetSlug, id: { not: id }, deletedAt: null },
        });
        if (duplicate) {
          throw new ConflictException(`Blog category with slug "${targetSlug}" already exists`);
        }
        slug = targetSlug;
      }
    }

    const updated = await this.prisma.blogCategory.update({
      where: { id },
      data: {
        ...dto,
        slug,
        updatedBy: userId || null,
      },
    });

    await this.cacheService.delete(CACHE_KEYS.BLOG_CATEGORIES);

    if (userId) {
      await this.prisma.activityLog.create({
        data: {
          userId,
          action: 'BLOG_CATEGORY_UPDATE',
          module: 'BLOG',
          recordId: id,
          description: `Updated blog category: ${updated.name}`,
          status: ActivityStatus.SUCCESS,
        },
      });
    }

    return updated;
  }

  /**
   * Soft delete blog category.
   */
  async remove(id: number, userId?: number) {
    const category = await this.prisma.blogCategory.findFirst({
      where: { id, deletedAt: null },
    });
    if (!category) {
      throw new NotFoundException(`Blog category #${id} not found`);
    }

    await this.prisma.blogCategory.update({
      where: { id },
      data: {
        deletedAt: new Date(),
        status: Status.INACTIVE,
        updatedBy: userId || null,
      },
    });

    await this.cacheService.delete(CACHE_KEYS.BLOG_CATEGORIES);

    if (userId) {
      await this.prisma.activityLog.create({
        data: {
          userId,
          action: 'BLOG_CATEGORY_DELETE',
          module: 'BLOG',
          recordId: id,
          description: `Soft deleted blog category #${id}`,
          status: ActivityStatus.SUCCESS,
        },
      });
    }

    return { message: `Blog category #${id} deleted successfully` };
  }
}
