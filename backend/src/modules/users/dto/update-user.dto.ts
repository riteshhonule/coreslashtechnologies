import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  MinLength,
  Matches,
} from 'class-validator';
import { Transform } from 'class-transformer';
import { Role, Status } from '@prisma/client';

export class UpdateUserDto {
  @ApiPropertyOptional({
    example: 'John Doe Updated',
    description: 'Full name of the user',
  })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiPropertyOptional({
    example: 'john.updated@example.com',
    description: 'Unique email address',
  })
  @IsEmail({}, { message: 'Please provide a valid email address' })
  @IsOptional()
  @Transform(({ value }: { value: any }) => (typeof value === 'string' ? value.trim().toLowerCase() : value))
  email?: string;

  @ApiPropertyOptional({
    example: 'NewPassword123!',
    description: 'Updated password',
  })
  @IsString()
  @IsOptional()
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'Password must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number or special character',
  })
  password?: string;

  @ApiPropertyOptional({
    enum: Role,
    description: 'User access role (ADMIN, EDITOR, AUTHOR)',
  })
  @IsEnum(Role, { message: 'Role must be one of: ADMIN, EDITOR, AUTHOR' })
  @IsOptional()
  role?: Role;

  @ApiPropertyOptional({
    enum: Status,
    description: 'User account status (ACTIVE, INACTIVE)',
  })
  @IsEnum(Status, { message: 'Status must be one of: ACTIVE, INACTIVE' })
  @IsOptional()
  status?: Status;

  @ApiPropertyOptional({
    example: '+1234567890',
    description: 'Phone number',
  })
  @IsString()
  @IsOptional()
  phone?: string;
}
