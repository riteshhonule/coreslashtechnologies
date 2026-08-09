import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsEmail, IsOptional, IsString } from 'class-validator';

export class UnsubscribeNewsletterDto {
  @ApiProperty({ example: 'subscriber@example.com' })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiPropertyOptional({ example: 'token_xyz123' })
  @IsOptional()
  @IsString()
  token?: string;
}
