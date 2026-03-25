import { IsEmail, IsString, Length } from 'class-validator';

export class CreateContactDto {
  @IsString()
  @Length(2, 120)
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @Length(6, 30)
  phone: string;

  @IsString()
  @Length(10, 5000)
  message: string;
}
