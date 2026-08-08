import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsInt, IsObject } from 'class-validator';

export class UpdateWebsiteSettingsDto {
  @ApiPropertyOptional({ example: 'CoreSlash Technologies' })
  @IsOptional()
  @IsString()
  siteName?: string;

  @ApiPropertyOptional({ example: 'Leading Enterprise Software Solutions' })
  @IsOptional()
  @IsString()
  siteDescription?: string;

  @ApiPropertyOptional({ example: 'Innovating Digital Products' })
  @IsOptional()
  @IsString()
  tagline?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  logoId?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  faviconId?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  defaultOgImageId?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  defaultMetaTitle?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  defaultMetaDescription?: string;

  @ApiPropertyOptional({ example: 'info@coreslash.com' })
  @IsOptional()
  @IsString()
  email?: string;

  @ApiPropertyOptional({ example: '+1-555-0199' })
  @IsOptional()
  @IsString()
  phone?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  address?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  facebook?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  linkedin?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  instagram?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  twitter?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  youtube?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsObject()
  businessHours?: Record<string, any>;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  googleMap?: string;

  @ApiPropertyOptional({ example: '© 2026 CoreSlash Technologies' })
  @IsOptional()
  @IsString()
  copyright?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  googleAnalyticsId?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  googleTagManagerId?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  facebookPixelId?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  robotsTxt?: string;

  @ApiPropertyOptional({ example: '#0f172a' })
  @IsOptional()
  @IsString()
  themeColor?: string;
}
