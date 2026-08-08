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
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { Public } from '@common/decorators/public.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { PermissionsGuard } from '../auth/guards/permissions.guard';
import { Permissions } from '../auth/decorators/permissions.decorator';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { IUserResponse } from '../auth/interfaces/auth.interface';
import { PaginationQueryDto } from '@common/dto/pagination-query.dto';
import { BlogsService } from './blogs.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { CreateBlogTagDto } from './dto/create-blog-tag.dto';

@ApiTags('Blogs')
@Controller('blogs')
export class BlogsController {
  constructor(private readonly blogsService: BlogsService) {}

  @Post()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Permissions('blogs.create')
  @ApiOperation({ summary: 'Create new blog post' })
  async create(
    @Body() createBlogDto: CreateBlogDto,
    @CurrentUser() user: IUserResponse,
  ) {
    return this.blogsService.create(createBlogDto, user.id);
  }

  @Public()
  @Get()
  @ApiOperation({ summary: 'Get paginated list of blog posts' })
  async findAll(@Query() query: PaginationQueryDto) {
    return this.blogsService.findAll(query);
  }

  @Public()
  @Get('tags')
  @ApiOperation({ summary: 'Get list of all blog tags' })
  async findAllTags() {
    return this.blogsService.findAllTags();
  }

  @Post('tags')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Permissions('blogs.create')
  @ApiOperation({ summary: 'Create a new blog tag' })
  async createTag(
    @Body() dto: CreateBlogTagDto,
    @CurrentUser() user: IUserResponse,
  ) {
    return this.blogsService.createTag(dto, user?.id);
  }

  @Public()
  @Get(':idOrSlug')
  @ApiOperation({ summary: 'Get blog post by ID or slug' })
  async findOne(@Param('idOrSlug') idOrSlug: string) {
    return this.blogsService.findOne(idOrSlug);
  }

  @Patch(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Permissions('blogs.update')
  @ApiOperation({ summary: 'Update blog post' })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateBlogDto: UpdateBlogDto,
    @CurrentUser() user: IUserResponse,
  ) {
    return this.blogsService.update(id, updateBlogDto, user.id);
  }

  @Patch(':id/publish')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Permissions('blogs.publish')
  @ApiOperation({ summary: 'Publish a draft blog post' })
  async publish(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser() user: IUserResponse,
  ) {
    return this.blogsService.publish(id, user.id);
  }

  @Patch(':id/unpublish')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Permissions('blogs.publish')
  @ApiOperation({ summary: 'Unpublish a blog post back to draft' })
  async unpublish(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser() user: IUserResponse,
  ) {
    return this.blogsService.unpublish(id, user.id);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Permissions('blogs.delete')
  @ApiOperation({ summary: 'Soft delete blog post' })
  async remove(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser() user: IUserResponse,
  ) {
    return this.blogsService.remove(id, user.id);
  }
}
