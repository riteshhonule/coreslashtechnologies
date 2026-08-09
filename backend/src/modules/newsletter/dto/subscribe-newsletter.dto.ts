import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsEmail } from 'class-validator';

export class SubscribeNewsletterDto {
  @ApiProperty({ example: 'subscriber@example.com' })
  @IsNotEmpty()
  @IsEmail()
  email: string;
}
