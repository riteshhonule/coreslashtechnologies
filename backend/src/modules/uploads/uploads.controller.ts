import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Query,
  Body,
  UseInterceptors,
  UploadedFile,
  UseGuards,
  ParseIntPipe,
  BadRequestException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { ApiTags, ApiOperation, ApiResponse, ApiConsumes, ApiBearerAuth } from '@nestjs/swagger';
import * as path from 'path';
import * as fs from 'fs';
import { ConfigService } from '@nestjs/config';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { PermissionsGuard } from '../auth/guards/permissions.guard';
import { Permissions } from '../auth/decorators/permissions.decorator';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { IUserResponse } from '../auth/interfaces/auth.interface';
import { PaginationQueryDto } from '@common/dto/pagination-query.dto';
import { UploadsService } from './uploads.service';
import { CreateMediaDto } from './dto/create-media.dto';
import { UpdateMediaDto } from './dto/update-media.dto';
import { UPLOAD_CONSTANTS } from '@core/constants/upload.constants';

@ApiTags('Media')
@Controller('media')
export class UploadsController {
  constructor(
    private readonly uploadsService: UploadsService,
    private readonly configService: ConfigService,
  ) {}

  @Post()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Permissions('media.create')
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Upload a media file' })
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: (req, file, cb) => {
          const destConfig = process.env.UPLOAD_DESTINATION || 'storage/uploads';
          const folder = req.body?.folder || 'uploads';
          const targetDir = path.isAbsolute(destConfig)
            ? path.join(destConfig, folder)
            : path.join(process.cwd(), destConfig, folder);

          if (!fs.existsSync(targetDir)) {
            fs.mkdirSync(targetDir, { recursive: true });
          }
          cb(null, targetDir);
        },
        filename: (req, file, cb) => {
          const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
          const ext = path.extname(file.originalname).toLowerCase();
          const safeName = path.basename(file.originalname, ext).replace(/[^a-zA-Z0-9]/g, '_');
          cb(null, `${safeName}-${uniqueSuffix}${ext}`);
        },
      }),
      limits: {
        fileSize: UPLOAD_CONSTANTS.MAX_FILE_SIZE,
      },
      fileFilter: (req, file, cb) => {
        const ext = path.extname(file.originalname).toLowerCase();
        if (
          !UPLOAD_CONSTANTS.ALLOWED_MIME_TYPES.includes(file.mimetype) ||
          !UPLOAD_CONSTANTS.ALLOWED_EXTENSIONS.includes(ext)
        ) {
          return cb(
            new BadRequestException(
              `Invalid file type. Allowed types: ${UPLOAD_CONSTANTS.ALLOWED_EXTENSIONS.join(', ')}`,
            ),
            false,
          );
        }
        cb(null, true);
      },
    }),
  )
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Body() createMediaDto: CreateMediaDto,
    @CurrentUser() user: IUserResponse,
  ) {
    return this.uploadsService.create(file, createMediaDto, user?.id);
  }

  @Get()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Permissions('media.read')
  @ApiOperation({ summary: 'Get paginated list of media items' })
  async findAll(@Query() query: PaginationQueryDto) {
    return this.uploadsService.findAll(query);
  }

  @Get(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Permissions('media.read')
  @ApiOperation({ summary: 'Get media details by ID' })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.uploadsService.findOne(id);
  }

  @Patch(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Permissions('media.create')
  @ApiOperation({ summary: 'Update media metadata' })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateMediaDto: UpdateMediaDto,
    @CurrentUser() user: IUserResponse,
  ) {
    return this.uploadsService.update(id, updateMediaDto, user?.id);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Permissions('media.delete')
  @ApiOperation({ summary: 'Soft delete media file' })
  async remove(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser() user: IUserResponse,
  ) {
    return this.uploadsService.remove(id, user?.id);
  }
}
