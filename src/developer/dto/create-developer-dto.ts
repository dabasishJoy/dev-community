import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateDeveloperDto {
  @IsNotEmpty({ message: 'First name is empty' })
  @IsString()
  fname: string;
  // @IsString()
  // lname: string;
  // @IsString()
  // email: string;
  // @IsString()
  // phone: string;
  // @IsString()
  @IsNotEmpty({ message: 'Password is empty' })
  @MinLength(6, { message: 'Password is too short' })
  @MaxLength(20)
  password: string;
  // @IsString()
  // userName: string;
}
