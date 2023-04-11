import {
  IsEmail,
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateDeveloperDto {
  @IsNotEmpty({ message: 'First name is empty' })
  @IsString()
  readonly fname: string;

  @IsNotEmpty({ message: 'Last name is empty' })
  @IsString()
  readonly lname: string;

  @IsEmail()
  @IsString()
  @IsNotEmpty({ message: 'Email is empty' })
  readonly email: string;

  @IsString()
  @IsPhoneNumber()
  @IsNotEmpty({ message: 'Phone is empty' })
  readonly phone: string;

  @IsString()
  @IsNotEmpty({ message: 'Password is empty' })
  @MinLength(6, { message: 'Password is too short' })
  @MaxLength(20, { message: 'Password is too long' })
  readonly password: string;

  @IsNotEmpty({ message: 'User name is empty' })
  @Matches(/^[a-zA-Z0-9]+$/)
  @IsString()
  readonly userName: string;
}
