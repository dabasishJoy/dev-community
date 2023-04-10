import { Body, Controller, Post, Res } from '@nestjs/common';
import { DeveloperService } from './developer.service';
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
}
