import { IsString, MaxLength, MinLength } from 'class-validator';

export class CreateDeveloperDto {
  @IsString()
  fname: string;
  @IsString()
  lname: string;
  @IsString()
  email: string;
  @IsString()
  phone: string;
  @IsString()
  @MinLength(6, { message: 'Password is too short' })
  @MaxLength(20)
  password: string;
  @IsString()
  userName: string;
}
