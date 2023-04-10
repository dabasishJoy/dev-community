import { Body, Controller, Post, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateExperienceDto } from './dto/create-experience-dto';
import { ExperienceService } from './experience.service';

@Controller('experience')
export class ExperienceController {
  constructor(private experienceService: ExperienceService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  async createExperience(
    @Body() createExperienceDto: CreateExperienceDto,
    @Res() response,
  ) {
    return this.experienceService.createExperience(
      createExperienceDto,
      response,
    );
  }
}
