import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '@database/prisma.service';
import { CacheService } from '@core/cache/cache.service';
import { CACHE_KEYS } from '@core/cache/cache.keys';
import { CACHE_TTL } from '@core/cache/cache.constants';
import { ActivityStatus } from '@prisma/client';
import { UpdateWebsiteSettingsDto } from './dto/update-website-settings.dto';
import { UpdateSystemSettingsDto } from './dto/update-system-settings.dto';
import { sanitizeSystemSettings } from './dto/system-settings-response.dto';

@Injectable()
export class SettingsService {
  private readonly logger = new Logger(SettingsService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly cacheService: CacheService,
  ) {}

  /**
   * Get Website Settings (Public / Cached).
   */
  async getWebsiteSettings() {
    return this.cacheService.getOrSet(
      CACHE_KEYS.WEBSITE_SETTINGS,
      async () => {
        let settings = await this.prisma.websiteSettings.findFirst({
          where: { deletedAt: null },
          include: {
            logo: true,
            favicon: true,
            defaultOgImage: true,
          },
        });

        if (!settings) {
          settings = await this.prisma.websiteSettings.create({
            data: {
              siteName: 'CoreSlash Technologies',
              siteDescription: 'Official Website & CMS Dashboard',
              tagline: 'Innovating Digital Products',
            },
            include: {
              logo: true,
              favicon: true,
              defaultOgImage: true,
            },
          });
        }
        return settings;
      },
      CACHE_TTL.VERY_LONG,
    );
  }

  /**
   * Update Website Settings (Admin).
   */
  async updateWebsiteSettings(dto: UpdateWebsiteSettingsDto, userId?: number) {
    const existing = await this.prisma.websiteSettings.findFirst({
      where: { deletedAt: null },
    });

    let updated;
    if (existing) {
      updated = await this.prisma.websiteSettings.update({
        where: { id: existing.id },
        data: {
          ...dto,
          updatedBy: userId || null,
        },
        include: {
          logo: true,
          favicon: true,
          defaultOgImage: true,
        },
      });
    } else {
      updated = await this.prisma.websiteSettings.create({
        data: {
          siteName: dto.siteName || 'CoreSlash Technologies',
          ...dto,
          createdBy: userId || null,
        },
        include: {
          logo: true,
          favicon: true,
          defaultOgImage: true,
        },
      });
    }

    await this.cacheService.delete(CACHE_KEYS.WEBSITE_SETTINGS);

    if (userId) {
      await this.prisma.activityLog.create({
        data: {
          userId,
          action: 'SETTINGS_UPDATE_WEBSITE',
          module: 'SETTINGS',
          recordId: updated.id,
          description: 'Updated Website Settings configuration',
          status: ActivityStatus.SUCCESS,
        },
      });
    }

    return updated;
  }

  /**
   * Get System Settings (Protected / Sanitized).
   */
  async getSystemSettings() {
    return this.cacheService.getOrSet(
      CACHE_KEYS.SYSTEM_SETTINGS,
      async () => {
        let settings = await this.prisma.systemSettings.findFirst({
          where: { deletedAt: null },
        });

        if (!settings) {
          settings = await this.prisma.systemSettings.create({
            data: {
              maintenanceMode: false,
              allowRegistration: false,
              maxUploadSize: 10485760,
              defaultLanguage: 'en',
              timezone: 'UTC',
            },
          });
        }
        return sanitizeSystemSettings(settings);
      },
      CACHE_TTL.LONG,
    );
  }

  /**
   * Update System Settings (Admin).
   */
  async updateSystemSettings(dto: UpdateSystemSettingsDto, userId?: number) {
    const existing = await this.prisma.systemSettings.findFirst({
      where: { deletedAt: null },
    });

    let updated;
    if (existing) {
      updated = await this.prisma.systemSettings.update({
        where: { id: existing.id },
        data: {
          ...dto,
          updatedBy: userId || null,
        },
      });
    } else {
      updated = await this.prisma.systemSettings.create({
        data: {
          ...dto,
          createdBy: userId || null,
        },
      });
    }

    await this.cacheService.delete(CACHE_KEYS.SYSTEM_SETTINGS);

    if (userId) {
      await this.prisma.activityLog.create({
        data: {
          userId,
          action: 'SETTINGS_UPDATE_SYSTEM',
          module: 'SETTINGS',
          recordId: updated.id,
          description: 'Updated System Settings configuration',
          status: ActivityStatus.SUCCESS,
        },
      });
    }

    return sanitizeSystemSettings(updated);
  }
}
