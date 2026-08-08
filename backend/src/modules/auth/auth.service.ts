import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
  Logger,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Status, ActivityStatus } from '@prisma/client';
import * as crypto from 'crypto';

import { PrismaService } from '@database/prisma.service';
import { LoginDto } from './dto/login.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { LogoutDto } from './dto/logout.dto';
import { PasswordHelper } from './helpers/password.helper';
import { HashHelper } from './helpers/hash.helper';
import { IJwtPayload, ILoginData, ITokenPair, IUserResponse, ILogActivityOptions } from './interfaces/auth.interface';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  /**
   * Authenticate active user by email and password.
   */
  async login(
    loginDto: LoginDto,
    ipAddress?: string,
    userAgent?: string,
  ): Promise<ILoginData> {
    const normalizedEmail = loginDto.email.trim().toLowerCase();

    // 1. Find user by email (excluding soft deleted)
    const user = await this.prisma.user.findFirst({
      where: {
        email: normalizedEmail,
        deletedAt: null,
      },
    });

    // Generic error message to prevent email/user enumeration
    const invalidCredentialsMessage = 'Invalid email or password';

    if (!user) {
      await this.logActivity({
        userId: null,
        action: 'LOGIN_FAILED',
        module: 'AUTH',
        description: `Failed login attempt for email: ${normalizedEmail} (user not found)`,
        status: ActivityStatus.FAILED,
        ipAddress,
        userAgent,
      });
      throw new UnauthorizedException(invalidCredentialsMessage);
    }

    // 2. Reject inactive users
    if (user.status !== Status.ACTIVE) {
      await this.logActivity({
        userId: user.id,
        action: 'LOGIN_FAILED',
        module: 'AUTH',
        description: `Failed login attempt for inactive user account: ${normalizedEmail}`,
        status: ActivityStatus.FAILED,
        ipAddress,
        userAgent,
      });
      throw new UnauthorizedException('User account is inactive or disabled. Please contact administrator.');
    }

    // 3. Compare password using bcrypt
    const isPasswordValid = await PasswordHelper.comparePassword(
      loginDto.password,
      user.password,
    );

    if (!isPasswordValid) {
      await this.logActivity({
        userId: user.id,
        action: 'LOGIN_FAILED',
        module: 'AUTH',
        description: `Failed login attempt for user: ${normalizedEmail} (invalid password)`,
        status: ActivityStatus.FAILED,
        ipAddress,
        userAgent,
      });
      throw new UnauthorizedException(invalidCredentialsMessage);
    }

    // 4. Update lastLogin timestamp and create RefreshToken in database via transaction
    const rawRefreshToken = crypto.randomBytes(32).toString('hex');
    const refreshHash = HashHelper.hashToken(rawRefreshToken);
    const refreshExpiry = this.calculateExpiryDate(
      this.configService.get<string>('jwt.refreshExpiresIn', '7d'),
    );

    const accessToken = this.generateAccessToken(user.id, user.email, user.role);

    await this.prisma.$transaction([
      this.prisma.user.update({
        where: { id: user.id },
        data: { lastLogin: new Date() },
      }),
      this.prisma.refreshToken.create({
        data: {
          userId: user.id,
          token: refreshHash,
          expiresAt: refreshExpiry,
          createdBy: user.id,
        },
      }),
    ]);

    // 5. Log success ActivityLog
    await this.logActivity({
      userId: user.id,
      action: 'LOGIN_SUCCESS',
      module: 'AUTH',
      description: `User ${user.email} logged in successfully`,
      status: ActivityStatus.SUCCESS,
      ipAddress,
      userAgent,
    });

    const expiresIn = this.configService.get<string>('jwt.expiresIn', '15m');
    const safeUser = this.sanitizeUser(user);

    return {
      user: safeUser,
      accessToken,
      refreshToken: rawRefreshToken,
      expiresIn,
    };
  }

  /**
   * Rotate refresh token and issue new token pair.
   * Detects suspicious reuse of revoked refresh tokens.
   */
  async refresh(
    refreshTokenDto: RefreshTokenDto,
    ipAddress?: string,
    userAgent?: string,
  ): Promise<ITokenPair> {
    const rawToken = refreshTokenDto.refreshToken;
    const suppliedHash = HashHelper.hashToken(rawToken);

    // Find refresh token record
    const tokenRecord = await this.prisma.refreshToken.findFirst({
      where: {
        token: suppliedHash,
        deletedAt: null,
      },
      include: {
        user: true,
      },
    });

    if (!tokenRecord) {
      await this.logActivity({
        action: 'TOKEN_REFRESH_FAILED',
        module: 'AUTH',
        description: 'Refresh failed: Token record not found',
        status: ActivityStatus.FAILED,
        ipAddress,
        userAgent,
      });
      throw new UnauthorizedException('Invalid or expired refresh token');
    }

    // REUSE DETECTION: If token is revoked, security breach! Revoke all sessions for user.
    if (tokenRecord.revokedAt !== null) {
      await this.prisma.refreshToken.updateMany({
        where: {
          userId: tokenRecord.userId,
          revokedAt: null,
        },
        data: {
          revokedAt: new Date(),
        },
      });

      await this.logActivity({
        userId: tokenRecord.userId,
        action: 'TOKEN_REUSE_DETECTED',
        module: 'AUTH',
        description: `CRITICAL SECURITY ALERT: Revoked refresh token reused for user ID ${tokenRecord.userId}. All active sessions have been revoked.`,
        status: ActivityStatus.FAILED,
        ipAddress,
        userAgent,
      });

      throw new UnauthorizedException(
        'Security Alert: Revoked refresh token reuse detected. All active sessions have been revoked for your safety.',
      );
    }

    // Check expiration
    if (tokenRecord.expiresAt < new Date()) {
      await this.prisma.refreshToken.update({
        where: { id: tokenRecord.id },
        data: { revokedAt: new Date() },
      });
      throw new UnauthorizedException('Refresh token has expired. Please log in again.');
    }

    // Validate user
    const user = tokenRecord.user;
    if (!user || user.deletedAt !== null || user.status !== Status.ACTIVE) {
      throw new UnauthorizedException('User account is inactive or deleted');
    }

    // Token Rotation inside Transaction
    const newRawRefreshToken = crypto.randomBytes(32).toString('hex');
    const newRefreshHash = HashHelper.hashToken(newRawRefreshToken);
    const newRefreshExpiry = this.calculateExpiryDate(
      this.configService.get<string>('jwt.refreshExpiresIn', '7d'),
    );

    const newAccessToken = this.generateAccessToken(user.id, user.email, user.role);

    await this.prisma.$transaction([
      this.prisma.refreshToken.update({
        where: { id: tokenRecord.id },
        data: { revokedAt: new Date() },
      }),
      this.prisma.refreshToken.create({
        data: {
          userId: user.id,
          token: newRefreshHash,
          expiresAt: newRefreshExpiry,
          createdBy: user.id,
        },
      }),
    ]);

    await this.logActivity({
      userId: user.id,
      action: 'TOKEN_REFRESH',
      module: 'AUTH',
      description: `Tokens successfully rotated for user ${user.email}`,
      status: ActivityStatus.SUCCESS,
      ipAddress,
      userAgent,
    });

    const expiresIn = this.configService.get<string>('jwt.expiresIn', '15m');

    return {
      accessToken: newAccessToken,
      refreshToken: newRawRefreshToken,
      expiresIn,
    };
  }

  /**
   * Revoke single refresh session (Logout).
   */
  async logout(
    userId: number,
    logoutDto: LogoutDto,
    ipAddress?: string,
    userAgent?: string,
  ): Promise<{ message: string }> {
    const rawToken = logoutDto.refreshToken;
    const suppliedHash = HashHelper.hashToken(rawToken);

    const tokenRecord = await this.prisma.refreshToken.findFirst({
      where: {
        token: suppliedHash,
        userId,
        deletedAt: null,
      },
    });

    if (tokenRecord && tokenRecord.revokedAt === null) {
      await this.prisma.refreshToken.update({
        where: { id: tokenRecord.id },
        data: { revokedAt: new Date() },
      });
    }

    await this.logActivity({
      userId,
      action: 'LOGOUT',
      module: 'AUTH',
      description: `User ID ${userId} logged out successfully`,
      status: ActivityStatus.SUCCESS,
      ipAddress,
      userAgent,
    });

    return { message: 'Successfully logged out' };
  }

  /**
   * Revoke all active refresh sessions for current user (Logout All).
   */
  async logoutAll(
    userId: number,
    ipAddress?: string,
    userAgent?: string,
  ): Promise<{ message: string }> {
    await this.prisma.refreshToken.updateMany({
      where: {
        userId,
        revokedAt: null,
      },
      data: {
        revokedAt: new Date(),
      },
    });

    await this.logActivity({
      userId,
      action: 'LOGOUT_ALL',
      module: 'AUTH',
      description: `User ID ${userId} logged out from all active devices`,
      status: ActivityStatus.SUCCESS,
      ipAddress,
      userAgent,
    });

    return { message: 'Successfully logged out from all devices' };
  }

  /**
   * Change user password and revoke all sessions.
   */
  async changePassword(
    userId: number,
    dto: ChangePasswordDto,
    ipAddress?: string,
    userAgent?: string,
  ): Promise<{ message: string }> {
    const user = await this.prisma.user.findFirst({
      where: {
        id: userId,
        deletedAt: null,
      },
    });

    if (!user) {
      throw new UnauthorizedException('User no longer exists');
    }

    // Verify current password
    const isCurrentPasswordValid = await PasswordHelper.comparePassword(
      dto.currentPassword,
      user.password,
    );

    if (!isCurrentPasswordValid) {
      await this.logActivity({
        userId,
        action: 'PASSWORD_CHANGE_FAILED',
        module: 'AUTH',
        description: 'Failed password change: Incorrect current password',
        status: ActivityStatus.FAILED,
        ipAddress,
        userAgent,
      });
      throw new BadRequestException('Current password is incorrect');
    }

    // Prevent same password reuse
    const isSamePassword = await PasswordHelper.comparePassword(
      dto.newPassword,
      user.password,
    );

    if (isSamePassword) {
      throw new BadRequestException('New password must be different from current password');
    }

    // Hash new password
    const hashedNewPassword = await PasswordHelper.hashPassword(dto.newPassword);

    // Transaction: update password, passwordChangedAt, and revoke all active refresh tokens
    await this.prisma.$transaction([
      this.prisma.user.update({
        where: { id: userId },
        data: {
          password: hashedNewPassword,
          passwordChangedAt: new Date(),
          updatedBy: userId,
        },
      }),
      this.prisma.refreshToken.updateMany({
        where: {
          userId,
          revokedAt: null,
        },
        data: {
          revokedAt: new Date(),
        },
      }),
    ]);

    await this.logActivity({
      userId,
      action: 'PASSWORD_CHANGED',
      module: 'AUTH',
      description: `Password changed successfully for user ${user.email}. All sessions revoked.`,
      status: ActivityStatus.SUCCESS,
      ipAddress,
      userAgent,
    });

    return { message: 'Password changed successfully. Please log in again with your new password.' };
  }

  /**
   * Helper to generate signed JWT access token.
   */
  public generateAccessToken(userId: number, email: string, role: any): string {
    const payload: IJwtPayload = {
      sub: userId,
      email,
      role,
    };

    return this.jwtService.sign(payload, {
      secret: this.configService.get<string>('jwt.secret', process.env.JWT_SECRET || 'coreslash_jwt_secret_key_change_in_production'),
      expiresIn: this.configService.get<string>('jwt.expiresIn', '15m'),
    });
  }

  /**
   * Sanitize user object (exclude sensitive fields like password).
   */
  public sanitizeUser(user: any): IUserResponse {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone || null,
      role: user.role,
      status: user.status,
      isEmailVerified: user.isEmailVerified,
      profileImageId: user.profileImageId || null,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }

  /**
   * Activity log helper.
   */
  public async logActivity(options: ILogActivityOptions): Promise<void> {
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

  /**
   * Parse duration string (e.g. '15m', '7d') into Date.
   */
  private calculateExpiryDate(duration: string): Date {
    const now = new Date();
    const match = duration.match(/^(\d+)([smhd])$/);

    if (!match) {
      // Default to 7 days
      return new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
    }

    const value = parseInt(match[1], 10);
    const unit = match[2];

    switch (unit) {
      case 's':
        return new Date(now.getTime() + value * 1000);
      case 'm':
        return new Date(now.getTime() + value * 60 * 1000);
      case 'h':
        return new Date(now.getTime() + value * 60 * 60 * 1000);
      case 'd':
        return new Date(now.getTime() + value * 24 * 60 * 60 * 1000);
      default:
        return new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
    }
  }
}
