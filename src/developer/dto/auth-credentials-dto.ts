import { IsString, MaxLength, MinLength } from 'class-validator';
export enum granType {
  EMAIL = 'email',
  REFRESH = 'refresh',
}
export class AuthCredentialsDto {
  granType: granType;
  @IsString()
  email: string;
  @IsString()
  @MinLength(6, { message: 'Password is too short' })
  @MaxLength(20)
  // @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
  //   message: 'Password is too weak',
  // })
  password: string;
  refreshToken?: string;
}
