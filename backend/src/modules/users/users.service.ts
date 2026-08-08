import {
  Injectable,
  NotFoundException,
  ConflictException,
  ForbiddenException,
  BadRequestException,
  Logger,
} from '@nestjs/common';
import { Role, Status, ActivityStatus } from '@prisma/client';

import { PrismaService } from '@database/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserQueryDto } from './dto/user-query.dto';
import { PasswordHelper } from '../auth/helpers/password.helper';
import { IUserResponse, ILogActivityOptions } from '../auth/interfaces/auth.interface';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);

  constructor(private readonly prisma: PrismaService) {}

  /**
   * Get authenticated user profile.
   */
  async getMe(userId: number): Promise<IUserResponse> {
    const user = await this.prisma.user.findFirst({
      where: {
        id: userId,
        deletedAt: null,
      },
      select: this.getUserSelectFields(),
    });

    if (!user) {
      throw new NotFoundException('User profile not found');
    }

    return user as IUserResponse;
  }

  /**
   * List paginated active users with search & filters.
   */
  async findAll(query: UserQueryDto) {
    const page = query.page || 1;
    const limit = query.limit || 20;
    const skip = (page - 1) * limit;

    const whereClause: any = {
      deletedAt: null,
    };

    if (query.search) {
      const searchTerm = query.search.trim();
      whereClause.OR = [
        { name: { contains: searchTerm, mode: 'insensitive' } },
        { email: { contains: searchTerm, mode: 'insensitive' } },
      ];
    }

    if (query.role) {
      whereClause.role = query.role;
    }

    if (query.status) {
      whereClause.status = query.status;
    }

    const [total, items] = await Promise.all([
      this.prisma.user.count({ where: whereClause }),
      this.prisma.user.findMany({
        where: whereClause,
        select: this.getUserSelectFields(),
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
    ]);

    return {
      items,
      meta: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit) || 1,
      },
    };
  }

  /**
   * Get single user by ID.
   */
  async findOne(id: number): Promise<IUserResponse> {
    const user = await this.prisma.user.findFirst({
      where: {
        id,
        deletedAt: null,
      },
      select: this.getUserSelectFields(),
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return user as IUserResponse;
  }

  /**
   * Create new user account.
   */
  async create(
    creator: IUserResponse,
    dto: CreateUserDto,
    ipAddress?: string,
    userAgent?: string,
  ): Promise<IUserResponse> {
    const normalizedEmail = dto.email.trim().toLowerCase();

    // 1. Email uniqueness check
    const existing = await this.prisma.user.findFirst({
      where: {
        email: normalizedEmail,
        deletedAt: null,
      },
    });

    if (existing) {
      throw new ConflictException('A user with this email address already exists');
    }

    // 2. Privilege escalation prevention: Only ADMIN can assign ADMIN role
    const requestedRole = dto.role || Role.AUTHOR;
    if (requestedRole === Role.ADMIN && creator.role !== Role.ADMIN) {
      throw new ForbiddenException('Only ADMIN users are authorized to create or assign ADMIN accounts');
    }

    // 3. Hash password
    const hashedPassword = await PasswordHelper.hashPassword(dto.password);

    // 4. Create user
    const newUser = await this.prisma.user.create({
      data: {
        name: dto.name,
        email: normalizedEmail,
        password: hashedPassword,
        role: requestedRole,
        status: dto.status || Status.ACTIVE,
        phone: dto.phone || null,
        createdBy: creator.id,
      },
      select: this.getUserSelectFields(),
    });

    // 5. Log activity
    await this.logActivity({
      userId: creator.id,
      action: 'USER_CREATED',
      module: 'USERS',
      recordId: newUser.id,
      description: `User ${newUser.email} (Role: ${newUser.role}) created by user ID ${creator.id}`,
      status: ActivityStatus.SUCCESS,
      ipAddress,
      userAgent,
    });

    return newUser as IUserResponse;
  }

  /**
   * Update existing user account.
   */
  async update(
    id: number,
    currentAuthUser: IUserResponse,
    dto: UpdateUserDto,
    ipAddress?: string,
    userAgent?: string,
  ): Promise<IUserResponse> {
    const targetUser = await this.prisma.user.findFirst({
      where: {
        id,
        deletedAt: null,
      },
    });

    if (!targetUser) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    // Protection rule: Only ADMIN can modify ADMIN accounts (unless self profile update non-role fields)
    if (targetUser.role === Role.ADMIN && currentAuthUser.role !== Role.ADMIN && currentAuthUser.id !== id) {
      throw new ForbiddenException('Only ADMIN users are authorized to modify ADMIN accounts');
    }

    // Privilege escalation check: non-admin setting role to ADMIN
    if (dto.role && dto.role === Role.ADMIN && currentAuthUser.role !== Role.ADMIN) {
      throw new ForbiddenException('Only ADMIN users are authorized to elevate roles to ADMIN');
    }

    // Last ADMIN protection: Cannot demote or deactivate the last active ADMIN
    if (
      targetUser.role === Role.ADMIN &&
      ((dto.status && dto.status !== Status.ACTIVE) || (dto.role && dto.role !== Role.ADMIN))
    ) {
      const remainingAdmins = await this.prisma.user.count({
        where: {
          role: Role.ADMIN,
          status: Status.ACTIVE,
          deletedAt: null,
          id: { not: id },
        },
      });

      if (remainingAdmins === 0) {
        throw new BadRequestException(
          'Operation denied: Cannot deactivate or demote the last remaining active ADMIN user',
        );
      }
    }

    const updateData: any = {};

    if (dto.name !== undefined) updateData.name = dto.name;
    if (dto.phone !== undefined) updateData.phone = dto.phone;
    if (dto.role !== undefined) updateData.role = dto.role;
    if (dto.status !== undefined) updateData.status = dto.status;

    if (dto.email !== undefined) {
      const normalizedEmail = dto.email.trim().toLowerCase();
      if (normalizedEmail !== targetUser.email) {
        const emailExists = await this.prisma.user.findFirst({
          where: {
            email: normalizedEmail,
            deletedAt: null,
            id: { not: id },
          },
        });
        if (emailExists) {
          throw new ConflictException('A user with this email address already exists');
        }
        updateData.email = normalizedEmail;
      }
    }

    if (dto.password !== undefined && dto.password.length > 0) {
      updateData.password = await PasswordHelper.hashPassword(dto.password);
      updateData.passwordChangedAt = new Date();
    }

    updateData.updatedBy = currentAuthUser.id;

    const updatedUser = await this.prisma.user.update({
      where: { id },
      data: updateData,
      select: this.getUserSelectFields(),
    });

    await this.logActivity({
      userId: currentAuthUser.id,
      action: 'USER_UPDATED',
      module: 'USERS',
      recordId: id,
      description: `User ID ${id} (${updatedUser.email}) updated by user ID ${currentAuthUser.id}`,
      status: ActivityStatus.SUCCESS,
      ipAddress,
      userAgent,
    });

    return updatedUser as IUserResponse;
  }

  /**
   * Soft delete user account and revoke active sessions.
   */
  async remove(
    id: number,
    currentAuthUser: IUserResponse,
    ipAddress?: string,
    userAgent?: string,
  ): Promise<{ message: string }> {
    const targetUser = await this.prisma.user.findFirst({
      where: {
        id,
        deletedAt: null,
      },
    });

    if (!targetUser) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    // Protection rule: Cannot self delete if user is last admin or unauthorized
    if (targetUser.role === Role.ADMIN) {
      const remainingAdmins = await this.prisma.user.count({
        where: {
          role: Role.ADMIN,
          status: Status.ACTIVE,
          deletedAt: null,
          id: { not: id },
        },
      });

      if (remainingAdmins === 0) {
        throw new BadRequestException('Operation denied: Cannot delete the last remaining active ADMIN user');
      }
    }

    if (targetUser.role === Role.ADMIN && currentAuthUser.role !== Role.ADMIN) {
      throw new ForbiddenException('Only ADMIN users are authorized to delete ADMIN accounts');
    }

    // Soft Delete inside Transaction
    await this.prisma.$transaction([
      this.prisma.user.update({
        where: { id },
        data: {
          deletedAt: new Date(),
          status: Status.INACTIVE,
          updatedBy: currentAuthUser.id,
        },
      }),
      this.prisma.refreshToken.updateMany({
        where: {
          userId: id,
          revokedAt: null,
        },
        data: {
          revokedAt: new Date(),
        },
      }),
    ]);

    await this.logActivity({
      userId: currentAuthUser.id,
      action: 'USER_DELETED',
      module: 'USERS',
      recordId: id,
      description: `User ID ${id} (${targetUser.email}) soft-deleted by user ID ${currentAuthUser.id}`,
      status: ActivityStatus.SUCCESS,
      ipAddress,
      userAgent,
    });

    return { message: 'User account successfully soft-deleted and all refresh sessions revoked' };
  }

  /**
   * Helper to select safe user fields (never return password).
   */
  private getUserSelectFields() {
    return {
      id: true,
      name: true,
      email: true,
      phone: true,
      role: true,
      status: true,
      isEmailVerified: true,
      profileImageId: true,
      createdAt: true,
      updatedAt: true,
    };
  }

  private async logActivity(options: ILogActivityOptions): Promise<void> {
    try {
      await this.prisma.activityLog.create({
        data: {
          userId: options.userId ?? null,
          action: options.action,
          module: options.module,
          recordId: options.recordId ?? null,
          description: options.description ?? null,
          status: options.status ?? ActivityStatus.SUCCESS,
          ipAddress: options.ipAddress ?? null,
          userAgent: options.userAgent ?? null,
        },
      });
    } catch (error) {
      this.logger.error(`Failed to record ActivityLog: ${(error as Error).message}`);
    }
  }
}
