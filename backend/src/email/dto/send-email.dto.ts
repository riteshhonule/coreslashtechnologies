import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class SendEmailDto {
  @IsEmail({}, { message: 'Please provide a valid recipient email address' })
  @IsNotEmpty({ message: 'Recipient email is required' })
  to: string;

  @IsString()
  @IsNotEmpty({ message: 'Subject is required' })
  @MinLength(3, { message: 'Subject must be at least 3 characters long' })
  subject: string;

  @IsString()
  @IsNotEmpty({ message: 'Message content is required' })
  @MinLength(10, { message: 'Message must be at least 10 characters long' })
  message: string;
}
