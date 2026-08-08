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
  Req,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { Request } from 'express';
import { Public } from '@common/decorators/public.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { PermissionsGuard } from '../auth/guards/permissions.guard';
import { Permissions } from '../auth/decorators/permissions.decorator';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { IUserResponse } from '../auth/interfaces/auth.interface';
import { PaginationQueryDto } from '@common/dto/pagination-query.dto';
import { ContactService } from './contact.service';
import { CreateContactInquiryDto } from './dto/create-contact-inquiry.dto';
import { UpdateContactInquiryDto } from './dto/update-contact-inquiry.dto';
import { InquiryStatus } from '@prisma/client';

@ApiTags('Contact & Inquiries')
@Controller('inquiries')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Public()
  @Post()
  @ApiOperation({ summary: 'Submit contact inquiry' })
  async create(
    @Body() dto: CreateContactInquiryDto,
    @Req() req: Request,
  ) {
    const ipAddress = req.ip || req.headers['x-forwarded-for']?.toString();
    const userAgent = req.headers['user-agent'];
    return this.contactService.create(dto, ipAddress, userAgent);
  }

  @Get()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Permissions('inquiries.read')
  @ApiOperation({ summary: 'Admin list contact inquiries' })
  @ApiQuery({ name: 'inquiryStatus', required: false, enum: InquiryStatus })
  @ApiQuery({ name: 'priority', required: false, type: String })
  @ApiQuery({ name: 'isArchived', required: false, type: Boolean })
  @ApiQuery({ name: 'assignedToId', required: false, type: Number })
  async findAll(
    @Query() query: PaginationQueryDto,
    @Query('inquiryStatus') inquiryStatus?: InquiryStatus,
    @Query('priority') priority?: string,
    @Query('isArchived') isArchived?: boolean,
    @Query('assignedToId') assignedToId?: number,
  ) {
    return this.contactService.findAll({
      ...query,
      inquiryStatus,
      priority,
      isArchived: isArchived !== undefined ? Boolean(isArchived) : undefined,
      assignedToId: assignedToId ? Number(assignedToId) : undefined,
    });
  }

  @Get(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Permissions('inquiries.read')
  @ApiOperation({ summary: 'Admin get contact inquiry details' })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.contactService.findOne(id);
  }

  @Patch(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Permissions('inquiries.update')
  @ApiOperation({ summary: 'Admin update contact inquiry' })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateContactInquiryDto,
    @CurrentUser() user: IUserResponse,
  ) {
    return this.contactService.update(id, dto, user?.id);
  }

  @Patch(':id/archive')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Permissions('inquiries.archive')
  @ApiOperation({ summary: 'Admin archive contact inquiry' })
  async archive(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser() user: IUserResponse,
  ) {
    return this.contactService.archive(id, user?.id);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Permissions('inquiries.archive')
  @ApiOperation({ summary: 'Admin soft delete contact inquiry' })
  async remove(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser() user: IUserResponse,
  ) {
    return this.contactService.remove(id, user?.id);
  }
}
