import { Body, Controller, Get, Post, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { DeveloperService } from './developer.service';
import { AuthCredentialsDto } from './dto/auth-credentials-dto';
import { CreateDeveloperDto } from './dto/create-developer-dto';
import { RefreshAccessTokenDto } from './dto/refresh-access-token-dto';

@Controller('developer')
export class DeveloperController {
  // initialize service
  constructor(private developerService: DeveloperService) {}

  // endpoints

  // sign up user
  @Post('/signup')
  async signupDeveoper(
    @Body() createDeveloperDto: CreateDeveloperDto,
    @Res() response,
  ): Promise<void> {
    return this.developerService.createDeveloper(createDeveloperDto, response);
  }

  //   sign in user
  @Post('/signin')
  async signinDeveoper(
    @Body() authCredentialsDto: AuthCredentialsDto,
    @Res() response,
  ): Promise<void> {
    return this.developerService.signInDeveloper(authCredentialsDto, response);
  }

  // refresh token

  @Post('/refresh-access-token')
  async refreshAccessToken(
    @Body() refreshAccessTokenDto: RefreshAccessTokenDto,
    @Res() response,
  ) {
    return this.developerService.refreshAccessToken(
      refreshAccessTokenDto,
      response,
    );
  }

  //   test
  @Get('/test')
  @UseGuards(AuthGuard('jwt'))
  async test() {
    return 'Success';
  }
}
