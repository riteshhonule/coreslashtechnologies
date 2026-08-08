import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class CreatePortfolioCategoryDto {
  @ApiProperty({ example: 'Web Applications' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiPropertyOptional({ example: 'web-applications' })
  @IsOptional()
  @IsString()
  slug?: string;
}
