import { IsEmail, IsString, Length, IsOptional } from 'class-validator';

export class CreateContactDto {
  @IsString()
  @Length(2, 120)
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @Length(6, 30)
  phone: string;

  @IsString()
  @IsOptional()
  @Length(2, 255)
  address?: string;

  @IsString()
  @IsOptional()
  @Length(2, 100)
  businessType?: string;

  @IsString()
  @IsOptional()
  @Length(2, 120)
  service?: string;

  @IsString()
  @Length(10, 5000)
  message: string;
}
