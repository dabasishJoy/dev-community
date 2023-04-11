import { Body, Controller, Get, Post, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user-decorator';
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
    @Res() response,
  ): Promise<void> {
    return this.developerService.createDeveloper(createDeveloperDto, response);
  }

  //   sign in user
  @Post('/signin')
  // @UseGuards(AuthGuard('jwt'))
  async signinDeveoper(
    @Body() authCredentialsDto: AuthCredentialsDto,
    @Res() response,
  ) {
      return this.developerService.signInDeveloper( authCredentialsDto,response);
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
  @Get('/test')
  @UseGuards(AuthGuard('jwt'))
  async test(@GetUser() developer: Developer) {
    return developer;
  }
}
