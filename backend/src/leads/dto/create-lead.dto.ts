import { IsOptional, IsString, Length, IsEmail } from 'class-validator';

export class CreateLeadDto {
  @IsString()
  @Length(2, 120)
  name: string;

  @IsEmail()
  @IsOptional()
  email?: string;

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

  @IsOptional()
  @IsString()
  source?: string;
}
