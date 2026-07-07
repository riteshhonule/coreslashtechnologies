import { IsString, IsNotEmpty, IsEnum } from 'class-validator';

export class UpdateCandidateStatusDto {
  @IsString()
  @IsNotEmpty()
  @IsEnum(['New', 'Shortlisted', 'Interview Scheduled', 'Selected', 'Rejected'])
  status: string;
}
