import { IsNotEmpty, IsString, Matches } from 'class-validator';
import { Transform } from 'class-transformer';

export class VerifyCertificateDto {
  @IsString()
  @IsNotEmpty({ message: 'Certificate number is required.' })
  @Transform(({ value }) => (typeof value === 'string' ? value.trim().toUpperCase() : value))
  @Matches(/^(CS|CST)-?\d{4}-?\d{4}$/, {
    message: 'Invalid certificate number format. Expected format like CS-2026-0001 or CST-2026-0001.',
  })
  certificateNumber: string;
}
