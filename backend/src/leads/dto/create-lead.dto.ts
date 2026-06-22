import { IsString, Length, IsOptional, IsNotEmpty } from 'class-validator';

export class CreateLeadDto {
  @IsString()
  @Length(2, 120)
  name: string;

  @IsString()
  @Length(6, 30)
  phone: string;

  @IsString()
  @Length(2, 100)
  city: string;

  @IsString()
  @IsOptional()
  @Length(2, 120)
  service?: string;
}
