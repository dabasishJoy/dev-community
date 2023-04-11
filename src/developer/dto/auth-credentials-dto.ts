import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
  ValidateIf,
} from 'class-validator';

export enum GranType {
  email = 'email',
  refresh = 'refresh',
}
export class AuthCredentialsDto {
  @IsNotEmpty({ message: 'Gran type name is empty' })
  @IsEnum(GranType, { message: 'Invalid grantype type' })
  @IsString()
  readonly granType: GranType;

  @IsNotEmpty({ message: 'Email is empty' })
  @IsString()
  @IsEmail()
  @ValidateIf((obj) => obj.granType === GranType.email)
  readonly email?: string;

  @ValidateIf((obj) => obj.granType === GranType.email)
  @IsString()
  @MinLength(6, { message: 'Password is too short' })
  @MaxLength(20, { message: 'Password is too long' })
  // @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
  //   message: 'Password is too weak',
  // })
  readonly password: string;

  @IsNotEmpty({ message: 'Refresh token is empty' })
  @IsString()
  @ValidateIf((obj) => obj.granType === GranType.refresh)
  readonly refreshToken?: string;
}
