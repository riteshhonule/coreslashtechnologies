import { IsOptional, IsString, Length } from 'class-validator';

export class CreateLeadDto {
  @IsString()
  @Length(2, 120)
  name: string;

  @IsString()
  @Length(6, 30)
  phone: string;

  @IsString()
  @Length(2, 80)
  city: string;

  @IsString()
  @Length(2, 120)
  service: string;

  @IsOptional()
  @IsString()
  source?: string;
}
