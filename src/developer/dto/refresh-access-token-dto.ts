import { IsString } from 'class-validator';

export class RefreshAccessTokenDto {
  @IsString()
  email: string;
  @IsString()

  // @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
  //   message: 'Password is too weak',
  // })
  refreshToken: string;
}
