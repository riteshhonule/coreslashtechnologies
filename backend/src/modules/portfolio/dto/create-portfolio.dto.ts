import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Status } from '@prisma/client';
import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsEnum,
  IsInt,
  IsBoolean,
  IsDateString,
} from 'class-validator';

export class CreatePortfolioDto {
  @ApiProperty({ example: 'Fintech Mobile & Web App' })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiPropertyOptional({ example: 'fintech-mobile-and-web-app' })
  @IsOptional()
  @IsString()
  slug?: string;

  @ApiProperty({ example: 'End-to-end banking application built for Acme Corp.' })
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  coverImageId?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  clientLogoId?: number;

  @ApiPropertyOptional()
  @IsOptional()
  gallery?: any;

  @ApiPropertyOptional({ example: 'Acme Financial Inc.' })
  @IsOptional()
  @IsString()
  client?: string;

  @ApiPropertyOptional({ example: 'Fintech / Banking' })
  @IsOptional()
  @IsString()
  industry?: string;

  @ApiPropertyOptional({ example: 'https://acmebank.example.com' })
  @IsOptional()
  @IsString()
  website?: string;

  @ApiPropertyOptional({ example: ['React', 'Node.js', 'PostgreSQL'] })
  @IsOptional()
  technologies?: any;

  @ApiPropertyOptional({ example: '6 months' })
  @IsOptional()
  @IsString()
  projectDuration?: string;

  @ApiPropertyOptional({ enum: Status, default: Status.PUBLISHED })
  @IsOptional()
  @IsEnum(Status)
  projectStatus?: Status;

  @ApiPropertyOptional({ example: '2026-06-30T00:00:00.000Z' })
  @IsOptional()
  @IsDateString()
  completionDate?: string;

  @ApiPropertyOptional({ default: false })
  @IsOptional()
  @IsBoolean()
  featured?: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  metaTitle?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  metaDescription?: string;

  @ApiPropertyOptional({ enum: Status, default: Status.PUBLISHED })
  @IsOptional()
  @IsEnum(Status)
  status?: Status;

  @ApiProperty({ example: 1 })
  @IsNotEmpty()
  @IsInt()
  categoryId: number;
}
