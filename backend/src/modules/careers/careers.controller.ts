import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Query,
  Body,
  UseGuards,
  ParseIntPipe,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
  NotFoundException,
  Res,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiConsumes, ApiQuery } from '@nestjs/swagger';
import { Response } from 'express';
import * as path from 'path';
import * as fs from 'fs';
import { Public } from '@common/decorators/public.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { PermissionsGuard } from '../auth/guards/permissions.guard';
import { Permissions } from '../auth/decorators/permissions.decorator';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { IUserResponse } from '../auth/interfaces/auth.interface';
import { PaginationQueryDto } from '@common/dto/pagination-query.dto';
import { CareersService } from './careers.service';
import { CreateCareerDto } from './dto/create-career.dto';
import { UpdateCareerDto } from './dto/update-career.dto';
import { CreateJobApplicationDto } from './dto/create-job-application.dto';
import { UpdateJobApplicationDto } from './dto/update-job-application.dto';
import { UPLOAD_CONSTANTS } from '@core/constants/upload.constants';

@ApiTags('Careers & Applications')
@Controller('careers')
export class CareersController {
  constructor(private readonly careersService: CareersService) {}

  @Post()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Permissions('careers.create')
  @ApiOperation({ summary: 'Create new career position' })
  async create(
    @Body() dto: CreateCareerDto,
    @CurrentUser() user: IUserResponse,
  ) {
    return this.careersService.create(dto, user?.id);
  }

  @Public()
  @Get()
  @ApiOperation({ summary: 'Get paginated list of career openings' })
  async findAll(@Query() query: PaginationQueryDto) {
    return this.careersService.findAll(query);
  }

  @Public()
  @Get(':idOrSlug')
  @ApiOperation({ summary: 'Get career position details by ID or slug' })
  async findOne(@Param('idOrSlug') idOrSlug: string) {
    return this.careersService.findOne(idOrSlug);
  }

  @Patch(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Permissions('careers.update')
  @ApiOperation({ summary: 'Update career position' })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateCareerDto,
    @CurrentUser() user: IUserResponse,
  ) {
    return this.careersService.update(id, dto, user?.id);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Permissions('careers.delete')
  @ApiOperation({ summary: 'Soft delete career position' })
  async remove(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser() user: IUserResponse,
  ) {
    return this.careersService.remove(id, user?.id);
  }

  // --- JOB APPLICATIONS ENDPOINTS ---
  @Public()
  @Post('apply')
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Submit job application with resume file' })
  @UseInterceptors(
    FileInterceptor('resume', {
      storage: diskStorage({
        destination: (req, file, cb) => {
          const destConfig = process.env.UPLOAD_DESTINATION || 'storage/uploads';
          const targetDir = path.isAbsolute(destConfig)
            ? path.join(destConfig, 'resumes')
            : path.join(process.cwd(), destConfig, 'resumes');

          if (!fs.existsSync(targetDir)) {
            fs.mkdirSync(targetDir, { recursive: true });
          }
          cb(null, targetDir);
        },
        filename: (req, file, cb) => {
          const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
          const ext = path.extname(file.originalname).toLowerCase();
          const safeName = path.basename(file.originalname, ext).replace(/[^a-zA-Z0-9]/g, '_');
          cb(null, `resume-${safeName}-${uniqueSuffix}${ext}`);
        },
      }),
      limits: {
        fileSize: UPLOAD_CONSTANTS.MAX_FILE_SIZE,
      },
      fileFilter: (req, file, cb) => {
        const ext = path.extname(file.originalname).toLowerCase();
        const allowed = ['.pdf', '.doc', '.docx'];
        if (!allowed.includes(ext)) {
          return cb(
            new BadRequestException(`Invalid resume file format. Allowed: ${allowed.join(', ')}`),
            false,
          );
        }
        cb(null, true);
      },
    }),
  )
  async apply(
    @UploadedFile() file: Express.Multer.File,
    @Body() dto: CreateJobApplicationDto,
  ) {
    return this.careersService.apply(dto, file);
  }

  @Get('applications/list')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Permissions('applications.read')
  @ApiOperation({ summary: 'Admin list job applications' })
  @ApiQuery({ name: 'careerId', required: false, type: Number })
  async findAllApplications(
    @Query() query: PaginationQueryDto,
    @Query('careerId') careerId?: number,
  ) {
    return this.careersService.findAllApplications(query, careerId ? Number(careerId) : undefined);
  }

  @Get('applications/:id/resume')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Permissions('applications.read')
  @ApiOperation({ summary: 'Admin download applicant resume document' })
  async downloadResume(
    @Param('id', ParseIntPipe) id: number,
    @Res() res: Response,
  ) {
    const application = await this.careersService.findApplicationById(id);
    const uploadDest = process.env.UPLOAD_DESTINATION || 'storage/uploads';
    const targetPath = path.isAbsolute(uploadDest)
      ? path.join(uploadDest, application.resume)
      : path.join(process.cwd(), uploadDest, application.resume);

    if (!fs.existsSync(targetPath)) {
      throw new NotFoundException(`Resume document file not found on server for application #${id}`);
    }

    return res.sendFile(targetPath);
  }

  @Patch('applications/:id/status')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Permissions('applications.update')
  @ApiOperation({ summary: 'Update job application status' })
  async updateApplicationStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateJobApplicationDto,
    @CurrentUser() user: IUserResponse,
  ) {
    return this.careersService.updateApplicationStatus(id, dto, user?.id);
  }
}
