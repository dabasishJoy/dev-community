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
import { CreateSkillsDto } from './dto/create-skills-dto';
import { UpdateSkillsDto } from './dto/update-skills-dto';
import { SkillsParams } from './interfaces/skills-params.interface';
import { SkillsService } from './skills.service';

@Controller('skills')
export class SkillsController {
  constructor(private skillsService: SkillsService) {}

  // create skill
  @Post()
  @UseGuards(AuthGuard('jwt'))
  async createSkill(@Body() createSkillsDto: CreateSkillsDto, @Res() response) {
    return this.skillsService.createSkills(createSkillsDto, response);
  }

  // update skill
  @Put()
  @UseGuards(AuthGuard('jwt'))
  async updateSkill(@Body() updateSkillsDto: UpdateSkillsDto, @Res() response) {
    return this.skillsService.updateSkills(updateSkillsDto, response);
  }

  // get skills of an author
  @Get()
  @UseGuards(AuthGuard('jwt'))
  async getSkills() {
    return this.skillsService.getSkills();
  }

  // get skills of an author
  @Get('/:authorId')
  @UseGuards(AuthGuard('jwt'))
  async getSkillsOfIndividual(@Param() skillsParams: SkillsParams) {
    return this.skillsService.getSkillsOfIndividual(skillsParams);
  }
}
