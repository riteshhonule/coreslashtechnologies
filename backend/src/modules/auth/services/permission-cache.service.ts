import { Injectable, Logger } from '@nestjs/common';
import { Role } from '@prisma/client';
import { CacheService } from '@core/cache/cache.service';
import { CACHE_KEYS } from '@core/cache/cache.keys';

@Injectable()
export class PermissionCacheService {
  private readonly logger = new Logger(PermissionCacheService.name);

  constructor(private readonly cacheService: CacheService) {}

  /**
   * Invalidate cached permissions for a specific role or all roles.
   */
  async invalidateRolePermissions(role?: Role): Promise<void> {
    if (role) {
      const key = CACHE_KEYS.PERMISSION_ROLE(role);
      this.logger.log(`Invalidating permission cache for role: ${role}`);
      await this.cacheService.delete(key);
    } else {
      this.logger.log('Invalidating permission cache for ALL roles');
      await this.cacheService.invalidate(CACHE_KEYS.PERMISSION_PATTERN);
    }
  }
}
