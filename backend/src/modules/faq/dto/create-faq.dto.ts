import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Status } from '@prisma/client';
import { IsNotEmpty, IsString, IsOptional, IsEnum, IsInt } from 'class-validator';

export class CreateFaqDto {
  @ApiProperty({ example: 'What technologies do you specialize in?' })
  @IsNotEmpty()
  @IsString()
  question: string;

  @ApiProperty({ example: 'We specialize in NestJS, React, PostgreSQL, Redis, and Cloud Architecture.' })
  @IsNotEmpty()
  @IsString()
  answer: string;

  @ApiPropertyOptional({ example: 'services' })
  @IsOptional()
  @IsString()
  page?: string;

  @ApiPropertyOptional({ default: 0 })
  @IsOptional()
  @IsInt()
  displayOrder?: number;

  @ApiPropertyOptional({ enum: Status, default: Status.ACTIVE })
  @IsOptional()
  @IsEnum(Status)
  status?: Status;
}
