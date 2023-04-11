import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateExperienceDto } from './dto/create-experience-dto';
import { UpdateExperienceDto } from './dto/update-experience-dto';
import { ExperienceService } from './experience.service';
import { ExperienceParams } from './interfaces/experience-params.interface';

@Controller('experience')
export class ExperienceController {
  constructor(private experienceService: ExperienceService) {}

  // create experiences
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

  // update experiences
  @Put('/:experienceId')
  @UseGuards(AuthGuard('jwt'))
  async updateExperience(
    @Param() experienceParams: ExperienceParams,
    @Body() updateExperienceDto: UpdateExperienceDto,
  ) {
    return this.experienceService.updateExperience(
      experienceParams,
      updateExperienceDto,
    );
  }
  // get experiences
  @Get()
  @UseGuards(AuthGuard('jwt'))
  async getExperiences() {
    return this.experienceService.getExperiences();
  }
}
