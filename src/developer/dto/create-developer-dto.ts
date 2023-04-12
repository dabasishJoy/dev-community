import { IsEmail, IsNotEmpty, IsPhoneNumber, IsString } from 'class-validator';

export class CreateDeveloperDto {
  @IsNotEmpty({ message: 'First name is empty' })
  @IsString()
  readonly fname: string;

  @IsNotEmpty({ message: 'Last name is empty' })
  @IsString()
  readonly lname: string;

  @IsNotEmpty({ message: 'Email is empty' })
  @IsEmail()
  readonly email: string;

  @IsNotEmpty({ message: 'Phone is empty' })
  @IsPhoneNumber()
  readonly phone: string;

  @IsNotEmpty({ message: 'Password is empty' })
  readonly password: string;
}
