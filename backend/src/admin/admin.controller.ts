import { Controller, Get, Post, Body, Patch, Param, UseGuards, Query } from '@nestjs/common';
import { AdminAuthService } from './admin-auth.service';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGuard } from './jwt-auth.guard';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateStatusDto } from './dto/update-status.dto';

@Controller('admin')
export class AdminController {
  constructor(
    private readonly adminAuthService: AdminAuthService,
    private readonly prisma: PrismaService,
  ) {}

  @Post('login')
  login(@Body() loginDto: LoginDto) {
    return this.adminAuthService.login(loginDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('stats')
  async getStats() {
    const [totalJobs, newJobs, totalEnquiries, newEnquiries] = await Promise.all([
      this.prisma.jobApplication.count(),
      this.prisma.jobApplication.count({ where: { status: 'NEW' } }),
      this.prisma.projectEnquiry.count(),
      this.prisma.projectEnquiry.count({ where: { status: 'NEW' } }),
    ]);

    return {
      totalJobs,
      newJobs,
      totalEnquiries,
      newEnquiries,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Get('jobs')
  async getJobs(
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '10',
    @Query('search') search: string = '',
    @Query('status') status: string = '',
  ) {
    const pageNumber = parseInt(page, 10);
    const limitNumber = parseInt(limit, 10);
    const skip = (pageNumber - 1) * limitNumber;

    const where: any = {};
    if (search) {
      where.OR = [
        { fullName: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } },
        { position: { contains: search, mode: 'insensitive' } },
      ];
    }
    if (status) {
      where.status = status;
    }

    const [items, total] = await Promise.all([
      this.prisma.jobApplication.findMany({
        where,
        skip,
        take: limitNumber,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.jobApplication.count({ where }),
    ]);

    return {
      items,
      total,
      page: pageNumber,
      totalPages: Math.ceil(total / limitNumber),
    };
  }

  @UseGuards(JwtAuthGuard)
  @Patch('jobs/:id/status')
  async updateJobStatus(@Param('id') id: string, @Body() updateStatusDto: UpdateStatusDto) {
    return this.prisma.jobApplication.update({
      where: { id: parseInt(id, 10) },
      data: { status: updateStatusDto.status as any },
    });
  }

  @UseGuards(JwtAuthGuard)
  @Get('enquiries')
  async getEnquiries(
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '10',
    @Query('search') search: string = '',
    @Query('status') status: string = '',
  ) {
    const pageNumber = parseInt(page, 10);
    const limitNumber = parseInt(limit, 10);
    const skip = (pageNumber - 1) * limitNumber;

    const where: any = {};
    if (search) {
      where.OR = [
        { fullName: { contains: search, mode: 'insensitive' } },
        { workEmail: { contains: search, mode: 'insensitive' } },
        { service: { contains: search, mode: 'insensitive' } },
        { location: { contains: search, mode: 'insensitive' } },
      ];
    }
    if (status) {
      where.status = status;
    }

    const [items, total] = await Promise.all([
      this.prisma.projectEnquiry.findMany({
        where,
        skip,
        take: limitNumber,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.projectEnquiry.count({ where }),
    ]);

    return {
      items,
      total,
      page: pageNumber,
      totalPages: Math.ceil(total / limitNumber),
    };
  }

  @UseGuards(JwtAuthGuard)
  @Patch('enquiries/:id/status')
  async updateEnquiryStatus(@Param('id') id: string, @Body() updateStatusDto: UpdateStatusDto) {
    return this.prisma.projectEnquiry.update({
      where: { id: parseInt(id, 10) },
      data: { status: updateStatusDto.status as any },
    });
  }
}
