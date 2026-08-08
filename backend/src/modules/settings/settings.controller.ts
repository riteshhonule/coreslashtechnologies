import { Controller, Get, Patch, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { Public } from '@common/decorators/public.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { PermissionsGuard } from '../auth/guards/permissions.guard';
import { Permissions } from '../auth/decorators/permissions.decorator';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { IUserResponse } from '../auth/interfaces/auth.interface';
import { SettingsService } from './settings.service';
import { UpdateWebsiteSettingsDto } from './dto/update-website-settings.dto';
import { UpdateSystemSettingsDto } from './dto/update-system-settings.dto';

@ApiTags('Settings')
@Controller('settings')
export class SettingsController {
  constructor(private readonly settingsService: SettingsService) {}

  @Public()
  @Get('website')
  @ApiOperation({ summary: 'Get public website settings' })
  async getWebsiteSettings() {
    return this.settingsService.getWebsiteSettings();
  }

  @Patch('website')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Permissions('settings.update')
  @ApiOperation({ summary: 'Update website settings' })
  async updateWebsiteSettings(
    @Body() dto: UpdateWebsiteSettingsDto,
    @CurrentUser() user: IUserResponse,
  ) {
    return this.settingsService.updateWebsiteSettings(dto, user?.id);
  }

  @Get('system')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Permissions('settings.read')
  @ApiOperation({ summary: 'Get operational system settings (safe)' })
  async getSystemSettings() {
    return this.settingsService.getSystemSettings();
  }

  @Patch('system')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Permissions('settings.update')
  @ApiOperation({ summary: 'Update system settings' })
  async updateSystemSettings(
    @Body() dto: UpdateSystemSettingsDto,
    @CurrentUser() user: IUserResponse,
  ) {
    return this.settingsService.updateSystemSettings(dto, user?.id);
  }
}
