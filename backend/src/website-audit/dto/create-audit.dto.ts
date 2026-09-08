import { IsString, IsNotEmpty, IsOptional, IsEmail } from 'class-validator';

export class CreateAuditDto {
  @IsString()
  @IsNotEmpty()
  url: string;

  @IsString()
  @IsOptional()
  competitorUrl?: string;

  @IsEmail()
  @IsOptional()
  email?: string;
}
