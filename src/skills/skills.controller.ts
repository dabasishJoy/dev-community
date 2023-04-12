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
import { CreateSkillsDto } from './dto/create-skills-dto';
import { UpdateSkillsDto } from './dto/update-skills-dto';

import { ISkillsParams } from './interfaces/skills-params.interface';
import { IUpdateSkillsParams } from './interfaces/update-skills-params.interface';
import { SkillsService } from './skills.service';

@Controller('skills')
export class SkillsController {
  constructor(private skillsService: SkillsService) {}

  // create skill
  @Post()
  @UseGuards(AuthGuard('jwt'))
  async createSkill(
    @GetUser() developer: IDeveloper,
    @Body() createSkillsDto: CreateSkillsDto,
  ) {
    return await this.skillsService.createSkills(createSkillsDto, developer);
  }

  // update skill
  @Put('/:skillId')
  @UseGuards(AuthGuard('jwt'))
  async updateSkill(
    @Param() updateSkillsParams: IUpdateSkillsParams,
    @Body() updateSkillsDto: UpdateSkillsDto,
  ) {
    return await this.skillsService.updateSkills(
      updateSkillsDto,
      updateSkillsParams,
    );
  }

  // get skills of an author
  @Get()
  @UseGuards(AuthGuard('jwt'))
  async getSkills() {
    return await this.skillsService.getSkills();
  }

  // get skills of an author
  @Get('/:authorId')
  @UseGuards(AuthGuard('jwt'))
  async getSkillsOfIndividual(@Param() skillsParams: ISkillsParams) {
    return await this.skillsService.getSkillsOfIndividual(skillsParams);
  }
}
