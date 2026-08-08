import {
  Injectable,
  NotFoundException,
  BadRequestException,
  Logger,
} from '@nestjs/common';
import { PrismaService } from '@database/prisma.service';
import { CacheService } from '@core/cache/cache.service';
import { CACHE_KEYS } from '@core/cache/cache.keys';
import { CACHE_TTL } from '@core/cache/cache.constants';
import { MediaType, ActivityStatus } from '@prisma/client';
import { CreateMediaDto } from './dto/create-media.dto';
import { UpdateMediaDto } from './dto/update-media.dto';
import { PaginationQueryDto } from '@common/dto/pagination-query.dto';
import { buildPaginatedResponse, IPaginatedResult, sanitizeSort, sanitizeSearch } from '@common/helpers/pagination.helper';
import * as path from 'path';

@Injectable()
export class UploadsService {
  private readonly logger = new Logger(UploadsService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly cacheService: CacheService,
  ) {}

  private mapMimeToMediaType(mimeType: string): MediaType {
    if (mimeType.startsWith('image/')) {
      return MediaType.IMAGE;
    }
    if (mimeType.startsWith('video/')) {
      return MediaType.VIDEO;
    }
    if (mimeType.includes('pdf') || mimeType.includes('word') || mimeType.includes('document')) {
      return MediaType.DOCUMENT;
    }
    return MediaType.IMAGE;
  }

  /**
   * Save uploaded file record in PostgreSQL Media table.
   */
  async create(
    file: Express.Multer.File,
    createMediaDto: CreateMediaDto,
    userId?: number,
  ) {
    if (!file) {
      throw new BadRequestException('No file provided for upload');
    }

    const folder = createMediaDto.folder || 'uploads';
    const ext = path.extname(file.originalname).toLowerCase();
    const mediaType = this.mapMimeToMediaType(file.mimetype);

    // Relative file path stored in DB
    const relativePath = `${folder}/${file.filename}`;

    const media = await this.prisma.media.create({
      data: {
        fileName: file.filename,
        originalName: file.originalname,
        filePath: relativePath,
        fileType: mediaType,
        mimeType: file.mimetype,
        fileSize: file.size,
        altText: createMediaDto.altText || null,
        title: createMediaDto.title || file.originalname,
        folder,
        extension: ext,
        storageType: 'local',
        isPublic: true,
        uploadedById: userId || null,
        createdBy: userId || null,
      },
    });

    await this.cacheService.invalidate(CACHE_KEYS.MEDIA_PATTERN);

    // Log ActivityLog
    if (userId) {
      await this.prisma.activityLog.create({
        data: {
          userId,
          action: 'MEDIA_CREATE',
          module: 'MEDIA',
          recordId: media.id,
          description: `Uploaded media file: ${media.originalName} (${media.fileType})`,
          status: ActivityStatus.SUCCESS,
        },
      });
    }

    return media;
  }

  /**
   * Paginated list of media files.
   */
  async findAll(query: PaginationQueryDto): Promise<IPaginatedResult<any>> {
    const page = Number(query.page) || 1;
    const limit = Number(query.limit) || 10;
    const skip = (page - 1) * limit;

    const sortBy = sanitizeSort(query.sortBy, ['createdAt', 'updatedAt', 'fileName', 'fileSize', 'mimeType'], 'createdAt');
    const search = sanitizeSearch(query.search);

    const where: any = {
      deletedAt: null,
    };

    if (search) {
      where.OR = [
        { originalName: { contains: search, mode: 'insensitive' } },
        { title: { contains: search, mode: 'insensitive' } },
        { altText: { contains: search, mode: 'insensitive' } },
      ];
    }

    const [items, total] = await Promise.all([
      this.prisma.media.findMany({
        where,
        skip,
        take: limit,
        orderBy: { [sortBy]: query.sortOrder || 'desc' },
      }),
      this.prisma.media.count({ where }),
    ]);

    return buildPaginatedResponse(items, total, page, limit);
  }

  /**
   * Get single media item.
   */
  async findOne(id: number) {
    const cacheKey = CACHE_KEYS.MEDIA(id);
    return this.cacheService.getOrSet(
      cacheKey,
      async () => {
        const media = await this.prisma.media.findFirst({
          where: { id, deletedAt: null },
        });
        if (!media) {
          throw new NotFoundException(`Media record #${id} not found`);
        }
        return media;
      },
      CACHE_TTL.LONG,
    );
  }

  /**
   * Update media metadata.
   */
  async update(id: number, updateMediaDto: UpdateMediaDto, userId?: number) {
    await this.findOne(id); // Ensure exists

    const updated = await this.prisma.media.update({
      where: { id },
      data: {
        altText: updateMediaDto.altText,
        title: updateMediaDto.title,
        folder: updateMediaDto.folder,
        isPublic: updateMediaDto.isPublic,
        updatedBy: userId || null,
      },
    });

    await this.cacheService.delete(CACHE_KEYS.MEDIA(id));
    await this.cacheService.invalidate(CACHE_KEYS.MEDIA_PATTERN);

    if (userId) {
      await this.prisma.activityLog.create({
        data: {
          userId,
          action: 'MEDIA_UPDATE',
          module: 'MEDIA',
          recordId: id,
          description: `Updated media #${id} metadata`,
          status: ActivityStatus.SUCCESS,
        },
      });
    }

    return updated;
  }

  /**
   * Soft delete media record.
   */
  async remove(id: number, userId?: number) {
    await this.findOne(id); // Ensure exists

    const deleted = await this.prisma.media.update({
      where: { id },
      data: {
        deletedAt: new Date(),
        updatedBy: userId || null,
      },
    });

    await this.cacheService.delete(CACHE_KEYS.MEDIA(id));
    await this.cacheService.invalidate(CACHE_KEYS.MEDIA_PATTERN);

    if (userId) {
      await this.prisma.activityLog.create({
        data: {
          userId,
          action: 'MEDIA_DELETE',
          module: 'MEDIA',
          recordId: id,
          description: `Soft deleted media #${id}`,
          status: ActivityStatus.SUCCESS,
        },
      });
    }

    return { message: `Media #${id} deleted successfully` };
  }
}
