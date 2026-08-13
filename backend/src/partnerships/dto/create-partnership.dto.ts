import { IsString, IsNotEmpty, IsEmail, IsOptional, IsBoolean } from 'class-validator';

export class CreatePartnershipDto {
  @IsString()
  @IsNotEmpty()
  fullName: string;

  @IsString()
  @IsNotEmpty()
  contactNumber: string;

  @IsEmail()
  @IsNotEmpty()
  workEmail: string;

  @IsString()
  @IsOptional()
  companyName?: string;

  @IsString()
  @IsOptional()
  partnershipType?: string;

  @IsBoolean()
  @IsOptional()
  consentData?: boolean;

  @IsBoolean()
  @IsOptional()
  consentMarketing?: boolean;
}
