import { Body, Controller, Get, Post, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../auth/get-user-decorator';
import { Developer } from './developer.model';
import { DeveloperService } from './developer.service';
import { AuthCredentialsDto } from './dto/auth-credentials-dto';
import { CreateDeveloperDto } from './dto/create-developer-dto';

@Controller('developer')
export class DeveloperController {
  // initialize service
  constructor(private developerService: DeveloperService) {}

  // endpoints

  // sign up user
  @Post('/signup')
  async signupDeveoper(
    @Body() createDeveloperDto: CreateDeveloperDto,
    // @Res() response,
  ): Promise<any> {
    return await this.developerService.createDeveloper(createDeveloperDto);
  }

  //   sign in user
  @Post('/signin')
  // @UseGuards(AuthGuard('jwt'))
  async signinDeveoper(
    @Body() authCredentialsDto: AuthCredentialsDto,
    @Res() response,
  ) {
    return this.developerService.signInDeveloper(authCredentialsDto, response);
  }

  @Get('/test')
  @UseGuards(AuthGuard('jwt'))
  async test(@GetUser() developer: Developer) {
    return developer;
  }
}

// @Get('/get-test')
// async getTest(@GetUser() user: Developer, au) {}
// refresh token

// @Post('/refresh-access-token')
// async refreshAccessToken(
//   @Body() refreshAccessTokenDto: RefreshAccessTokenDto,
//   @Res() response,
// ) {
//   return this.developerService.refreshAccessToken(
//     refreshAccessTokenDto,
//     response,
//   );
// }

//   test
