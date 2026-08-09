import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class CreateMediaDto {
  @ApiPropertyOptional({ example: 'CoreSlash Logo' })
  @IsOptional()
  @IsString()
  altText?: string;

  @ApiPropertyOptional({ example: 'Company Main Logo' })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiPropertyOptional({ example: 'logos', default: 'uploads' })
  @IsOptional()
  @IsString()
  folder?: string;
}
