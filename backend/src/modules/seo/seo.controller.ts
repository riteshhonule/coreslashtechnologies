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
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { Public } from '@common/decorators/public.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { PermissionsGuard } from '../auth/guards/permissions.guard';
import { Permissions } from '../auth/decorators/permissions.decorator';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { IUserResponse } from '../auth/interfaces/auth.interface';
import { PaginationQueryDto } from '@common/dto/pagination-query.dto';
import { SeoService } from './seo.service';
import { CreateSeoMetaDto } from './dto/create-seo-meta.dto';
import { UpdateSeoMetaDto } from './dto/update-seo-meta.dto';

@ApiTags('SEO')
@Controller('seo')
export class SeoController {
  constructor(private readonly seoService: SeoService) {}

  @Public()
  @Get('page/:pageName')
  @ApiOperation({ summary: 'Get cached SEO metadata for a page' })
  @ApiQuery({ name: 'pageId', required: false, type: Number })
  async findByPage(
    @Param('pageName') pageName: string,
    @Query('pageId') pageId?: number,
  ) {
    return this.seoService.findByPage(pageName, pageId ? Number(pageId) : undefined);
  }

  @Post()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Permissions('settings.update')
  @ApiOperation({ summary: 'Create or update page SEO metadata' })
  async create(
    @Body() dto: CreateSeoMetaDto,
    @CurrentUser() user: IUserResponse,
  ) {
    return this.seoService.create(dto, user?.id);
  }

  @Get()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Permissions('settings.read')
  @ApiOperation({ summary: 'Admin list all SEO metadata records' })
  async findAll(@Query() query: PaginationQueryDto) {
    return this.seoService.findAll(query);
  }

  @Patch(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Permissions('settings.update')
  @ApiOperation({ summary: 'Update SEO metadata record' })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateSeoMetaDto,
    @CurrentUser() user: IUserResponse,
  ) {
    return this.seoService.update(id, dto, user?.id);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Permissions('settings.update')
  @ApiOperation({ summary: 'Soft delete SEO metadata record' })
  async remove(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser() user: IUserResponse,
  ) {
    return this.seoService.remove(id, user?.id);
  }
}
