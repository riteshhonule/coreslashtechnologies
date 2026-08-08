import { Injectable, CanActivate, ExecutionContext, ForbiddenException, Logger } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from '@prisma/client';
import { PrismaService } from '@database/prisma.service';
import { CacheService } from '@core/cache/cache.service';
import { CACHE_KEYS } from '@core/cache/cache.keys';
import { CACHE_TTL } from '@core/cache/cache.constants';
import { AUTH_CONSTANTS } from '../constants/auth.constants';
import { IUserResponse } from '../interfaces/auth.interface';

@Injectable()
export class PermissionsGuard implements CanActivate {
  private readonly logger = new Logger(PermissionsGuard.name);

  constructor(
    private readonly reflector: Reflector,
    private readonly prisma: PrismaService,
    private readonly cacheService: CacheService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredPermissions = this.reflector.getAllAndOverride<string[]>(
      AUTH_CONSTANTS.PERMISSIONS_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!requiredPermissions || requiredPermissions.length === 0) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user as IUserResponse;

    if (!user || !user.role) {
      throw new ForbiddenException('Access denied: Authentication context missing');
    }

    // ADMIN users bypass permission checks as superusers
    if (user.role === Role.ADMIN) {
      return true;
    }

    const userPermissions = await this.getPermissionsForRole(user.role);

    const hasAllPermissions = requiredPermissions.every((perm) => userPermissions.has(perm));
    if (!hasAllPermissions) {
      const missing = requiredPermissions.filter((perm) => !userPermissions.has(perm));
      this.logger.warn(
        `Permission denied for user ${user.id} (${user.email}, role ${user.role}). Missing permissions: ${missing.join(', ')}`,
      );
      throw new ForbiddenException(
        `Access denied: You do not have the required permission (${missing.join(', ')})`,
      );
    }

    return true;
  }

  private async getPermissionsForRole(role: Role): Promise<Set<string>> {
    const cacheKey = CACHE_KEYS.PERMISSION_ROLE(role);

    // 1. Attempt Redis Cache Lookup
    const cachedSlugs = await this.cacheService.get<string[]>(cacheKey);
    if (cachedSlugs && Array.isArray(cachedSlugs)) {
      return new Set(cachedSlugs);
    }

    // 2. Cache Miss or Redis Error -> Source of Truth (PostgreSQL)
    const rolePermissions = await this.prisma.rolePermission.findMany({
      where: {
        role,
        deletedAt: null,
        permission: {
          deletedAt: null,
        },
      },
      include: {
        permission: true,
      },
    });

    const permissionSlugs = rolePermissions
      .map((rp) => rp.permission?.slug)
      .filter((slug): slug is string => Boolean(slug));

    // 3. Save to Redis Cache with MEDIUM TTL (300s)
    await this.cacheService.set<string[]>(cacheKey, permissionSlugs, CACHE_TTL.MEDIUM);

    return new Set(permissionSlugs);
  }

  /**
   * Helper to invalidate cache when permissions are updated.
   */
  public async clearCache(role?: Role): Promise<void> {
    if (role) {
      await this.cacheService.delete(CACHE_KEYS.PERMISSION_ROLE(role));
    } else {
      await this.cacheService.invalidate(CACHE_KEYS.PERMISSION_PATTERN);
    }
  }
}
