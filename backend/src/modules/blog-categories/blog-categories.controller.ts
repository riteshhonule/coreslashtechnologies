import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { Public } from '@common/decorators/public.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { PermissionsGuard } from '../auth/guards/permissions.guard';
import { Permissions } from '../auth/decorators/permissions.decorator';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { IUserResponse } from '../auth/interfaces/auth.interface';
import { BlogCategoriesService } from './blog-categories.service';
import { CreateBlogCategoryDto } from './dto/create-blog-category.dto';
import { UpdateBlogCategoryDto } from './dto/update-blog-category.dto';

@ApiTags('Blog Categories')
@Controller('blog-categories')
export class BlogCategoriesController {
  constructor(private readonly blogCategoriesService: BlogCategoriesService) {}

  @Post()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Permissions('blogs.create')
  @ApiOperation({ summary: 'Create new blog category' })
  async create(
    @Body() dto: CreateBlogCategoryDto,
    @CurrentUser() user: IUserResponse,
  ) {
    return this.blogCategoriesService.create(dto, user?.id);
  }

  @Public()
  @Get()
  @ApiOperation({ summary: 'Get list of blog categories' })
  async findAll() {
    return this.blogCategoriesService.findAll();
  }

  @Public()
  @Get(':idOrSlug')
  @ApiOperation({ summary: 'Get blog category by ID or slug' })
  async findOne(@Param('idOrSlug') idOrSlug: string) {
    return this.blogCategoriesService.findOne(idOrSlug);
  }

  @Patch(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Permissions('blogs.update')
  @ApiOperation({ summary: 'Update blog category' })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateBlogCategoryDto,
    @CurrentUser() user: IUserResponse,
  ) {
    return this.blogCategoriesService.update(id, dto, user?.id);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Permissions('blogs.delete')
  @ApiOperation({ summary: 'Soft delete blog category' })
  async remove(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser() user: IUserResponse,
  ) {
    return this.blogCategoriesService.remove(id, user?.id);
  }
}
