import { Body, Controller, Logger, Post } from '@nestjs/common';
import { DeveloperService } from './developer.service';
import { AuthCredentialsDto } from './dto/auth-credentials-dto';
import { CreateDeveloperDto } from './dto/create-developer-dto';

@Controller('developer')
export class DeveloperController {
  logger = new Logger('Developer Controller');
  // initialize service
  constructor(private developerService: DeveloperService) {}

  // sign up user
  @Post('/signup')
  async signupDeveoper(
    @Body() createDeveloperDto: CreateDeveloperDto,
  ): Promise<any> {
    return await this.developerService.createDeveloper(createDeveloperDto);
  }

  //   sign in user
  @Post('/signin')
  async signinDeveoper(
    @Body() authCredentialsDto: AuthCredentialsDto,
  ): Promise<any> {
    console.log(authCredentialsDto);
    return await this.developerService.signInDeveloper(authCredentialsDto);
  }
}
