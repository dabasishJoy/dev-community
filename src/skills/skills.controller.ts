import { Body, Controller, Post, Put, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateSkillsDto } from './dto/create-skills-dto';
import { UpdateSkillsDto } from './dto/update-skills-dto';
import { SkillsService } from './skills.service';

@Controller('skills')
export class SkillsController {
  constructor(private skillsService: SkillsService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  async createSkill(@Body() createSkillsDto: CreateSkillsDto, @Res() response) {
    return this.skillsService.createSkills(createSkillsDto, response);
  }

  @Put()
  @UseGuards(AuthGuard('jwt'))
  async updateSkill(@Body() updateSkillsDto: UpdateSkillsDto, @Res() response) {
    return this.skillsService.updateSkills(updateSkillsDto, response);
  }
}
