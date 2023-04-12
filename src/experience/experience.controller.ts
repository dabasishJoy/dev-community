import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/decorators/get-user-decorator';
import { IDeveloper } from 'src/developer/interfaces/developer.interface';
import { CreateExperienceDto } from './dto/create-experience-dto';
import { UpdateExperienceDto } from './dto/update-experience-dto';
import { ExperienceService } from './experience.service';
import { IExperienceParams } from './interfaces/experience-params.interface';
import { IUpdateExperienceParams } from './interfaces/update-experience-params.interface';

@Controller('experience')
export class ExperienceController {
  constructor(private experienceService: ExperienceService) {}

  // create experiences
  @Post()
  @UseGuards(AuthGuard('jwt'))
  async createExperience(
    @GetUser() developer: IDeveloper,
    @Body() createExperienceDto: CreateExperienceDto,
  ) {
    return await this.experienceService.createExperience(
      createExperienceDto,
      developer,
    );
  }

  // update experiences
  @Put('/:experienceId')
  @UseGuards(AuthGuard('jwt'))
  async updateExperience(
    @Param() updateExperienceParams: IUpdateExperienceParams,
    @Body() updateExperienceDto: UpdateExperienceDto,
  ) {
    return await this.experienceService.updateExperience(
      updateExperienceParams,
      updateExperienceDto,
    );
  }

  // get experiences
  @Get('/:authorId')
  @UseGuards(AuthGuard('jwt'))
  async getExperiences(@Param() experienceParams: IExperienceParams) {
    return await this.experienceService.getExperiences(experienceParams);
  }
}
