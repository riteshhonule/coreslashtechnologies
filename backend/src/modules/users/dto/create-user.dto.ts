import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
  Matches,
} from 'class-validator';
import { Transform } from 'class-transformer';
import { Role, Status } from '@prisma/client';

export class CreateUserDto {
  @ApiProperty({
    example: 'John Doe',
    description: 'Full name of the user',
  })
  @IsString()
  @IsNotEmpty({ message: 'Name is required' })
  name: string;

  @ApiProperty({
    example: 'john@example.com',
    description: 'Unique email address',
  })
  @IsEmail({}, { message: 'Please provide a valid email address' })
  @IsNotEmpty({ message: 'Email is required' })
  @Transform(({ value }: { value: any }) => (typeof value === 'string' ? value.trim().toLowerCase() : value))
  email: string;

  @ApiProperty({
    example: 'SecurePassword123!',
    description: 'Initial password for user account',
  })
  @IsString()
  @IsNotEmpty({ message: 'Password is required' })
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'Password must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number or special character',
  })
  password: string;

  @ApiPropertyOptional({
    enum: Role,
    default: Role.AUTHOR,
    description: 'User access role (ADMIN, EDITOR, AUTHOR)',
  })
  @IsEnum(Role, { message: 'Role must be one of: ADMIN, EDITOR, AUTHOR' })
  @IsOptional()
  role?: Role = Role.AUTHOR;

  @ApiPropertyOptional({
    enum: Status,
    default: Status.ACTIVE,
    description: 'User account status (ACTIVE, INACTIVE)',
  })
  @IsEnum(Status, { message: 'Status must be one of: ACTIVE, INACTIVE' })
  @IsOptional()
  status?: Status = Status.ACTIVE;

  @ApiPropertyOptional({
    example: '+1234567890',
    description: 'Phone number',
  })
  @IsString()
  @IsOptional()
  phone?: string;
}
