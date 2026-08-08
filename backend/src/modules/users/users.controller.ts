import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
  ParseIntPipe,
  Req,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiParam,
} from '@nestjs/swagger';
import { Request } from 'express';

import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserQueryDto } from './dto/user-query.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { PermissionsGuard } from '../auth/guards/permissions.guard';
import { Permissions } from '../auth/decorators/permissions.decorator';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { IUserResponse } from '../auth/interfaces/auth.interface';

@ApiTags('Users')
@ApiBearerAuth('JWT-auth')
@UseGuards(JwtAuthGuard, RolesGuard, PermissionsGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('me')
  @ApiOperation({ summary: 'Get current authenticated user profile' })
  @ApiResponse({ status: 200, description: 'User profile retrieved successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized access' })
  async getMe(@CurrentUser('id') userId: number) {
    const user = await this.usersService.getMe(userId);
    return {
      message: 'User profile retrieved successfully',
      data: user,
    };
  }

  @Get()
  @Permissions('users.read')
  @ApiOperation({ summary: 'List all active users with pagination and search' })
  @ApiResponse({ status: 200, description: 'Users list retrieved successfully' })
  @ApiResponse({ status: 403, description: 'Forbidden: Insufficient permissions' })
  async findAll(@Query() query: UserQueryDto) {
    const result = await this.usersService.findAll(query);
    return {
      message: 'Users list retrieved successfully',
      data: result.items,
      meta: result.meta,
    };
  }

  @Get(':id')
  @Permissions('users.read')
  @ApiOperation({ summary: 'Get user details by ID' })
  @ApiParam({ name: 'id', description: 'User ID', type: Number })
  @ApiResponse({ status: 200, description: 'User details retrieved successfully' })
  @ApiResponse({ status: 404, description: 'User not found' })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const user = await this.usersService.findOne(id);
    return {
      message: 'User details retrieved successfully',
      data: user,
    };
  }

  @Post()
  @Permissions('users.create')
  @ApiOperation({ summary: 'Create a new user account' })
  @ApiResponse({ status: 201, description: 'User created successfully' })
  @ApiResponse({ status: 409, description: 'Email address already exists' })
  @ApiResponse({ status: 403, description: 'Forbidden: Cannot assign ADMIN role without ADMIN privileges' })
  async create(
    @CurrentUser() currentAuthUser: IUserResponse,
    @Body() createUserDto: CreateUserDto,
    @Req() req: Request,
  ) {
    const ipAddress = req.ip || (req.headers['x-forwarded-for'] as string);
    const userAgent = req.headers['user-agent'];
    const user = await this.usersService.create(currentAuthUser, createUserDto, ipAddress, userAgent);
    return {
      message: 'User created successfully',
      data: user,
    };
  }

  @Patch(':id')
  @Permissions('users.update')
  @ApiOperation({ summary: 'Update existing user account' })
  @ApiParam({ name: 'id', description: 'User ID', type: Number })
  @ApiResponse({ status: 200, description: 'User updated successfully' })
  @ApiResponse({ status: 404, description: 'User not found' })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser() currentAuthUser: IUserResponse,
    @Body() updateUserDto: UpdateUserDto,
    @Req() req: Request,
  ) {
    const ipAddress = req.ip || (req.headers['x-forwarded-for'] as string);
    const userAgent = req.headers['user-agent'];
    const user = await this.usersService.update(id, currentAuthUser, updateUserDto, ipAddress, userAgent);
    return {
      message: 'User updated successfully',
      data: user,
    };
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @Permissions('users.delete')
  @ApiOperation({ summary: 'Soft delete user account and revoke refresh sessions' })
  @ApiParam({ name: 'id', description: 'User ID', type: Number })
  @ApiResponse({ status: 200, description: 'User soft deleted successfully' })
  @ApiResponse({ status: 400, description: 'Cannot delete the last active ADMIN' })
  @ApiResponse({ status: 404, description: 'User not found' })
  async remove(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser() currentAuthUser: IUserResponse,
    @Req() req: Request,
  ) {
    const ipAddress = req.ip || (req.headers['x-forwarded-for'] as string);
    const userAgent = req.headers['user-agent'];
    return this.usersService.remove(id, currentAuthUser, ipAddress, userAgent);
  }
}
