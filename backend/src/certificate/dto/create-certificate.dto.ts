import { IsNotEmpty, IsString, Matches, IsOptional, IsIn, IsISO8601 } from 'class-validator';

export class CreateCertificateDto {
  @IsString()
  @IsNotEmpty({ message: 'Certificate number is required.' })
  @Matches(/^(CS|CST)-?\d{4}-?\d{4}$/, {
    message: 'Invalid certificate number format. Expected format like CS-2026-0001 or CST-2026-0001.',
  })
  certificateNumber: string;

  @IsString()
  @IsNotEmpty({ message: 'Candidate name is required.' })
  candidateName: string;

  @IsString()
  @IsNotEmpty({ message: 'Course name is required.' })
  courseName: string;

  @IsISO8601({}, { message: 'Issue date must be a valid ISO8601 date string.' })
  @IsNotEmpty({ message: 'Issue date is required.' })
  issueDate: string;

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
