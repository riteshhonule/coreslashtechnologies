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
import { PortfolioService } from './portfolio.service';
import { CreatePortfolioCategoryDto } from './dto/create-portfolio-category.dto';
import { CreatePortfolioDto } from './dto/create-portfolio.dto';
import { UpdatePortfolioDto } from './dto/update-portfolio.dto';

@ApiTags('Portfolio')
@Controller('portfolio')
export class PortfolioController {
  constructor(private readonly portfolioService: PortfolioService) {}

  @Public()
  @Get('categories')
  @ApiOperation({ summary: 'Get list of portfolio categories' })
  async findAllCategories() {
    return this.portfolioService.findAllCategories();
  }

  @Post('categories')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Permissions('portfolio.create')
  @ApiOperation({ summary: 'Create new portfolio category' })
  async createCategory(
    @Body() dto: CreatePortfolioCategoryDto,
    @CurrentUser() user: IUserResponse,
  ) {
    return this.portfolioService.createCategory(dto, user?.id);
  }

  @Post()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Permissions('portfolio.create')
  @ApiOperation({ summary: 'Create new portfolio item' })
  async create(
    @Body() dto: CreatePortfolioDto,
    @CurrentUser() user: IUserResponse,
  ) {
    return this.portfolioService.create(dto, user?.id);
  }

  @Public()
  @Get()
  @ApiOperation({ summary: 'Get paginated list of portfolio items' })
  async findAll(@Query() query: PaginationQueryDto) {
    return this.portfolioService.findAll(query);
  }

  @Public()
  @Get(':idOrSlug')
  @ApiOperation({ summary: 'Get portfolio item by ID or slug' })
  async findOne(@Param('idOrSlug') idOrSlug: string) {
    return this.portfolioService.findOne(idOrSlug);
  }

  @Patch(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Permissions('portfolio.update')
  @ApiOperation({ summary: 'Update portfolio item' })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdatePortfolioDto,
    @CurrentUser() user: IUserResponse,
  ) {
    return this.portfolioService.update(id, dto, user?.id);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Permissions('portfolio.delete')
  @ApiOperation({ summary: 'Soft delete portfolio item' })
  async remove(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser() user: IUserResponse,
  ) {
    return this.portfolioService.remove(id, user?.id);
  }
}
