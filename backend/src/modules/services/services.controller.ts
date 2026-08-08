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
import { ServicesService } from './services.service';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';

@ApiTags('Services')
@Controller('services')
export class ServicesController {
  constructor(private readonly servicesService: ServicesService) {}

  @Post()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Permissions('services.create')
  @ApiOperation({ summary: 'Create new service' })
  async create(
    @Body() createServiceDto: CreateServiceDto,
    @CurrentUser() user: IUserResponse,
  ) {
    return this.servicesService.create(createServiceDto, user?.id);
  }

  @Public()
  @Get()
  @ApiOperation({ summary: 'Get paginated list of services' })
  async findAll(@Query() query: PaginationQueryDto) {
    return this.servicesService.findAll(query);
  }

  @Public()
  @Get(':idOrSlug')
  @ApiOperation({ summary: 'Get service details by ID or slug' })
  async findOne(@Param('idOrSlug') idOrSlug: string) {
    return this.servicesService.findOne(idOrSlug);
  }

  @Patch(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Permissions('services.update')
  @ApiOperation({ summary: 'Update service' })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateServiceDto: UpdateServiceDto,
    @CurrentUser() user: IUserResponse,
  ) {
    return this.servicesService.update(id, updateServiceDto, user?.id);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Permissions('services.delete')
  @ApiOperation({ summary: 'Soft delete service' })
  async remove(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser() user: IUserResponse,
  ) {
    return this.servicesService.remove(id, user?.id);
  }
}
