import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { EmploymentType, JobStatus } from '@prisma/client';
import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsEnum,
} from 'class-validator';

export class CreateCareerDto {
  @ApiProperty({ example: 'Senior Full Stack Engineer' })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiPropertyOptional({ example: 'senior-full-stack-engineer' })
  @IsOptional()
  @IsString()
  slug?: string;

  @ApiPropertyOptional({ example: 'Engineering' })
  @IsOptional()
  @IsString()
  department?: string;

  @ApiPropertyOptional({ example: 'Remote / New York' })
  @IsOptional()
  @IsString()
  location?: string;

  @ApiPropertyOptional({ enum: EmploymentType, default: EmploymentType.FULL_TIME })
  @IsOptional()
  @IsEnum(EmploymentType)
  employmentType?: EmploymentType;

  @ApiPropertyOptional({ example: '5+ years' })
  @IsOptional()
  @IsString()
  experience?: string;

  @ApiPropertyOptional({ example: '$120,000 - $150,000' })
  @IsOptional()
  @IsString()
  salary?: string;

  @ApiProperty({ example: 'We are seeking an experienced Full Stack Engineer...' })
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiPropertyOptional()
  @IsOptional()
  requirements?: any;

  @ApiPropertyOptional()
  @IsOptional()
  responsibilities?: any;

  @ApiPropertyOptional()
  @IsOptional()
  benefits?: any;

  @ApiPropertyOptional({ enum: JobStatus, default: JobStatus.OPEN })
  @IsOptional()
  @IsEnum(JobStatus)
  status?: JobStatus;
}
