import { IsString, IsEmail, IsOptional, IsArray, ArrayMinSize, Matches } from 'class-validator';

export class CreateInquiryDto {
  @IsString()
  fullName: string;

  @IsString()
  @Matches(/^[0-9]{10}$/, { message: 'Invalid mobile number' })
  mobile: string;

  @IsEmail()
  email: string;

  @IsString()
  @IsOptional()
  organization?: string;

  @IsArray()
  @IsString({ each: true })
  @ArrayMinSize(1)
  services: string[];
}
