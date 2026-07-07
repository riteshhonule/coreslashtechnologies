import { IsString, IsNotEmpty, IsEmail, IsArray, IsEnum } from 'class-validator';

export class CreateMarketingInquiryDto {
  @IsString()
  @IsNotEmpty()
  fullName: string;

  @IsString()
  @IsNotEmpty()
  mobile: string;

  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  college: string;

  @IsString()
  @IsNotEmpty()
  @IsEnum(['Work From Home', 'Office'])
  mode: string;

  @IsArray()
  @IsString({ each: true })
  focusAreas: string[];

  @IsString()
  @IsNotEmpty()
  duration: string;
}
