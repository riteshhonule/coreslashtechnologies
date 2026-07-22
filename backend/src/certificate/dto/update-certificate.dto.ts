import { IsOptional, IsString, Matches, IsIn, IsISO8601 } from 'class-validator';

export class UpdateCertificateDto {
  @IsString()
  @IsOptional()
  @Matches(/^(CS|CST)-?\d{4}-?\d{4}$/, {
    message: 'Invalid certificate number format. Expected format like CS-2026-0001 or CST-2026-0001.',
  })
  certificateNumber?: string;

  @IsString()
  @IsOptional()
  candidateName?: string;

  @IsString()
  @IsOptional()
  courseName?: string;

  @IsISO8601({}, { message: 'Issue date must be a valid ISO8601 date string.' })
  @IsOptional()
  issueDate?: string;

  @IsISO8601({}, { message: 'Completion date must be a valid ISO8601 date string.' })
  @IsOptional()
  completionDate?: string;

  @IsString()
  @IsOptional()
  grade?: string;

  @IsString()
  @IsOptional()
  @IsIn(['Verified', 'Revoked', 'Expired'], {
    message: 'Status must be Verified, Revoked, or Expired.',
  })
  status?: 'Verified' | 'Revoked' | 'Expired';

  @IsString()
  @IsOptional()
  certificateUrl?: string;
}
