import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsEmail, IsOptional } from 'class-validator';

export class CreateContactInquiryDto {
  @ApiProperty({ example: 'John Smith' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ example: 'john.smith@example.com' })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiPropertyOptional({ example: '+1-555-0144' })
  @IsOptional()
  @IsString()
  phone?: string;

  @ApiPropertyOptional({ example: 'Acme Corp' })
  @IsOptional()
  @IsString()
  company?: string;

  @ApiPropertyOptional({ example: 'Web Development' })
  @IsOptional()
  @IsString()
  service?: string;

  @ApiPropertyOptional({ example: 'Project Inquiry' })
  @IsOptional()
  @IsString()
  subject?: string;

  @ApiProperty({ example: 'We would like to request a quote for building a web portal.' })
  @IsNotEmpty()
  @IsString()
  message: string;

  @ApiPropertyOptional({ example: 'website_contact_form' })
  @IsOptional()
  @IsString()
  source?: string;
}
