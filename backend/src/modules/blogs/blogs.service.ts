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
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { CreateBlogTagDto } from './dto/create-blog-tag.dto';
import { PaginationQueryDto } from '@common/dto/pagination-query.dto';
import { buildPaginatedResponse, IPaginatedResult, sanitizeSort, sanitizeSearch } from '@common/helpers/pagination.helper';
import { slugify } from '@common/helpers/slug.helper';

@Injectable()
export class BlogsService {
  private readonly logger = new Logger(BlogsService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly cacheService: CacheService,
  ) {}

  /**
   * Helper to find or create tags by name without overwriting existing tags.
   */
  private async resolveTags(tagIds?: number[], tagNames?: string[]): Promise<number[]> {
    const finalTagIds = new Set<number>(tagIds || []);

    if (tagNames && tagNames.length > 0) {
      for (const name of tagNames) {
        if (!name || name.trim() === '') continue;
        const slug = slugify(name);

        let tag = await this.prisma.blogTag.findFirst({
          where: { slug, deletedAt: null },
        });

        if (!tag) {
          tag = await this.prisma.blogTag.create({
            data: { name: name.trim(), slug },
          });
        }
        finalTagIds.add(tag.id);
      }
    }

    return Array.from(finalTagIds);
  }

  /**
   * Create Blog (Transactional tag mapping).
   */
  async create(createBlogDto: CreateBlogDto, userId: number) {
    const slug = createBlogDto.slug
      ? slugify(createBlogDto.slug)
      : slugify(createBlogDto.title);

    // Check slug uniqueness
    const existing = await this.prisma.blog.findFirst({
      where: { slug, deletedAt: null },
    });
    if (existing) {
      throw new ConflictException(`Blog post with slug "${slug}" already exists`);
    }

    // Verify category existence
    const category = await this.prisma.blogCategory.findFirst({
      where: { id: createBlogDto.categoryId, deletedAt: null },
    });
    if (!category) {
      throw new BadRequestException(`Category #${createBlogDto.categoryId} does not exist`);
    }

    const tagIds = await this.resolveTags(createBlogDto.tagIds, createBlogDto.tags);

    const isPublishing = createBlogDto.status === Status.PUBLISHED;

    const blog = await this.prisma.$transaction(async (tx) => {
      const created = await tx.blog.create({
        data: {
          title: createBlogDto.title,
          slug,
          excerpt: createBlogDto.excerpt || null,
          content: createBlogDto.content,
          featuredImageId: createBlogDto.featuredImageId || null,
          metaTitle: createBlogDto.metaTitle || null,
          metaDescription: createBlogDto.metaDescription || null,
          keywords: createBlogDto.keywords || null,
          status: createBlogDto.status || Status.DRAFT,
          publishedAt: isPublishing ? new Date() : null,
          readTime: createBlogDto.readTime || null,
          isFeatured: createBlogDto.isFeatured || false,
          allowComments: createBlogDto.allowComments ?? true,
          isPinned: createBlogDto.isPinned || false,
          categoryId: createBlogDto.categoryId,
          authorId: userId,
          createdBy: userId,
        },
      });

      if (tagIds.length > 0) {
        await tx.blogTagMap.createMany({
          data: tagIds.map((tagId) => ({
            blogId: created.id,
            tagId,
            createdBy: userId,
          })),
        });
      }

      return created;
    });

    await this.cacheService.invalidate(CACHE_KEYS.BLOG_PATTERN);

    await this.prisma.activityLog.create({
      data: {
        userId,
        action: 'BLOG_CREATE',
        module: 'BLOG',
        recordId: blog.id,
        description: `Created blog post: ${blog.title}`,
        status: ActivityStatus.SUCCESS,
      },
    });

    return this.findOne(String(blog.id));
  }

  /**
   * Paginated list of blogs.
   */
  async findAll(query: PaginationQueryDto): Promise<IPaginatedResult<any>> {
    const page = Number(query.page) || 1;
    const limit = Number(query.limit) || 10;
    const skip = (page - 1) * limit;

    const sortBy = sanitizeSort(query.sortBy, ['createdAt', 'updatedAt', 'publishedAt', 'title', 'status', 'readTime'], 'createdAt');
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
        { excerpt: { contains: search, mode: 'insensitive' } },
        { content: { contains: search, mode: 'insensitive' } },
      ];
    }

    const [items, total] = await Promise.all([
      this.prisma.blog.findMany({
        where,
        skip,
        take: limit,
        orderBy: { [sortBy]: query.sortOrder || 'desc' },
        include: {
          category: true,
          author: {
            select: { id: true, name: true, email: true, role: true },
          },
          featuredImage: true,
          tagMaps: {
            include: { tag: true },
          },
        },
      }),
      this.prisma.blog.count({ where }),
    ]);

    return buildPaginatedResponse(items, total, page, limit);
  }

  /**
   * Get single blog by ID or Slug.
   */
  async findOne(idOrSlug: string) {
    const isId = /^\d+$/.test(idOrSlug);
    const cacheKey = CACHE_KEYS.BLOG(idOrSlug);

    return this.cacheService.getOrSet(
      cacheKey,
      async () => {
        const where: any = { deletedAt: null };
        if (isId) {
          where.id = parseInt(idOrSlug, 10);
        } else {
          where.slug = idOrSlug;
        }

        const blog = await this.prisma.blog.findFirst({
          where,
          include: {
            category: true,
            author: {
              select: { id: true, name: true, email: true, role: true },
            },
            featuredImage: true,
            tagMaps: {
              include: { tag: true },
            },
          },
        });

        if (!blog) {
          throw new NotFoundException(`Blog post "${idOrSlug}" not found`);
        }

        return blog;
      },
      CACHE_TTL.LONG,
    );
  }

  /**
   * Update blog.
   */
  async update(id: number, updateBlogDto: UpdateBlogDto, userId: number) {
    const blog = await this.prisma.blog.findFirst({
      where: { id, deletedAt: null },
    });
    if (!blog) {
      throw new NotFoundException(`Blog post #${id} not found`);
    }

    let slug = blog.slug;
    if (updateBlogDto.slug || updateBlogDto.title) {
      const targetSlug = updateBlogDto.slug
        ? slugify(updateBlogDto.slug)
        : slugify(updateBlogDto.title || blog.title);

      if (targetSlug !== blog.slug) {
        const duplicate = await this.prisma.blog.findFirst({
          where: { slug: targetSlug, id: { not: id }, deletedAt: null },
        });
        if (duplicate) {
          throw new ConflictException(`Blog post with slug "${targetSlug}" already exists`);
        }
        slug = targetSlug;
      }
    }

    const hasNewTags = updateBlogDto.tagIds || updateBlogDto.tags;
    const tagIds = hasNewTags
      ? await this.resolveTags(updateBlogDto.tagIds, updateBlogDto.tags)
      : null;

    const updated = await this.prisma.$transaction(async (tx) => {
      const res = await tx.blog.update({
        where: { id },
        data: {
          title: updateBlogDto.title,
          slug,
          excerpt: updateBlogDto.excerpt,
          content: updateBlogDto.content,
          featuredImageId: updateBlogDto.featuredImageId,
          metaTitle: updateBlogDto.metaTitle,
          metaDescription: updateBlogDto.metaDescription,
          keywords: updateBlogDto.keywords,
          status: updateBlogDto.status,
          readTime: updateBlogDto.readTime,
          isFeatured: updateBlogDto.isFeatured,
          allowComments: updateBlogDto.allowComments,
          isPinned: updateBlogDto.isPinned,
          categoryId: updateBlogDto.categoryId,
          updatedBy: userId,
        },
      });

      if (tagIds !== null) {
        await tx.blogTagMap.deleteMany({ where: { blogId: id } });
        if (tagIds.length > 0) {
          await tx.blogTagMap.createMany({
            data: tagIds.map((tagId) => ({
              blogId: id,
              tagId,
              createdBy: userId,
            })),
          });
        }
      }

      return res;
    });

    await this.cacheService.delete(CACHE_KEYS.BLOG(id));
    await this.cacheService.delete(CACHE_KEYS.BLOG(blog.slug));
    await this.cacheService.invalidate(CACHE_KEYS.BLOG_PATTERN);

    await this.prisma.activityLog.create({
      data: {
        userId,
        action: 'BLOG_UPDATE',
        module: 'BLOG',
        recordId: id,
        description: `Updated blog post: ${updated.title}`,
        status: ActivityStatus.SUCCESS,
      },
    });

    return this.findOne(String(id));
  }

  /**
   * Controlled Publish.
   */
  async publish(id: number, userId: number) {
    const blog = await this.prisma.blog.findFirst({
      where: { id, deletedAt: null },
    });
    if (!blog) {
      throw new NotFoundException(`Blog post #${id} not found`);
    }

    if (!blog.content || blog.content.trim() === '') {
      throw new BadRequestException('Cannot publish blog with empty content');
    }

    const updated = await this.prisma.blog.update({
      where: { id },
      data: {
        status: Status.PUBLISHED,
        publishedAt: new Date(),
        updatedBy: userId,
      },
    });

    await this.cacheService.delete(CACHE_KEYS.BLOG(id));
    await this.cacheService.delete(CACHE_KEYS.BLOG(blog.slug));
    await this.cacheService.invalidate(CACHE_KEYS.BLOG_PATTERN);

    await this.prisma.activityLog.create({
      data: {
        userId,
        action: 'BLOG_PUBLISH',
        module: 'BLOG',
        recordId: id,
        description: `Published blog post: ${updated.title}`,
        status: ActivityStatus.SUCCESS,
      },
    });

    return updated;
  }

  /**
   * Controlled Unpublish (Revert to DRAFT).
   */
  async unpublish(id: number, userId: number) {
    const blog = await this.prisma.blog.findFirst({
      where: { id, deletedAt: null },
    });
    if (!blog) {
      throw new NotFoundException(`Blog post #${id} not found`);
    }

    const updated = await this.prisma.blog.update({
      where: { id },
      data: {
        status: Status.DRAFT,
        updatedBy: userId,
      },
    });

    await this.cacheService.delete(CACHE_KEYS.BLOG(id));
    await this.cacheService.delete(CACHE_KEYS.BLOG(blog.slug));
    await this.cacheService.invalidate(CACHE_KEYS.BLOG_PATTERN);

    await this.prisma.activityLog.create({
      data: {
        userId,
        action: 'BLOG_UNPUBLISH',
        module: 'BLOG',
        recordId: id,
        description: `Unpublished blog post: ${updated.title}`,
        status: ActivityStatus.SUCCESS,
      },
    });

    return updated;
  }

  /**
   * Soft delete blog post.
   */
  async remove(id: number, userId: number) {
    const blog = await this.prisma.blog.findFirst({
      where: { id, deletedAt: null },
    });
    if (!blog) {
      throw new NotFoundException(`Blog post #${id} not found`);
    }

    await this.prisma.blog.update({
      where: { id },
      data: {
        deletedAt: new Date(),
        status: Status.ARCHIVED,
        updatedBy: userId,
      },
    });

    await this.cacheService.delete(CACHE_KEYS.BLOG(id));
    await this.cacheService.delete(CACHE_KEYS.BLOG(blog.slug));
    await this.cacheService.invalidate(CACHE_KEYS.BLOG_PATTERN);

    await this.prisma.activityLog.create({
      data: {
        userId,
        action: 'BLOG_DELETE',
        module: 'BLOG',
        recordId: id,
        description: `Soft deleted blog post #${id}`,
        status: ActivityStatus.SUCCESS,
      },
    });

    return { message: `Blog post #${id} deleted successfully` };
  }

  // --- BLOG TAGS MANAGEMENT ---
  async findAllTags() {
    return this.prisma.blogTag.findMany({
      where: { deletedAt: null },
      orderBy: { name: 'asc' },
    });
  }

  async createTag(dto: CreateBlogTagDto, userId?: number) {
    const slug = dto.slug ? slugify(dto.slug) : slugify(dto.name);
    const existing = await this.prisma.blogTag.findFirst({
      where: { slug, deletedAt: null },
    });
    if (existing) {
      return existing;
    }

    return this.prisma.blogTag.create({
      data: {
        name: dto.name.trim(),
        slug,
        createdBy: userId || null,
      },
    });
  }
}
