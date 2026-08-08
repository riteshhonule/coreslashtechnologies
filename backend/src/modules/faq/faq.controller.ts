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
import { FaqService } from './faq.service';
import { CreateFaqDto } from './dto/create-faq.dto';
import { UpdateFaqDto } from './dto/update-faq.dto';

@ApiTags('FAQ')
@Controller('faqs')
export class FaqController {
  constructor(private readonly faqService: FaqService) {}

  @Post()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Permissions('faq.create')
  @ApiOperation({ summary: 'Create new FAQ' })
  async create(
    @Body() dto: CreateFaqDto,
    @CurrentUser() user: IUserResponse,
  ) {
    return this.faqService.create(dto, user?.id);
  }

  @Public()
  @Get()
  @ApiOperation({ summary: 'Get paginated list of FAQs' })
  @ApiQuery({ name: 'pageName', required: false, type: String })
  async findAll(
    @Query() query: PaginationQueryDto,
    @Query('pageName') pageName?: string,
  ) {
    return this.faqService.findAll({ ...query, pageName });
  }

  @Public()
  @Get(':id')
  @ApiOperation({ summary: 'Get FAQ details by ID' })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.faqService.findOne(id);
  }

  @Patch(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Permissions('faq.update')
  @ApiOperation({ summary: 'Update FAQ' })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateFaqDto,
    @CurrentUser() user: IUserResponse,
  ) {
    return this.faqService.update(id, dto, user?.id);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Permissions('faq.delete')
  @ApiOperation({ summary: 'Soft delete FAQ' })
  async remove(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser() user: IUserResponse,
  ) {
    return this.faqService.remove(id, user?.id);
  }
}
