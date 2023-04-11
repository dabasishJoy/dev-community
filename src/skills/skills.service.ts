import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateSkillsDto } from './dto/create-skills-dto';
import { UpdateSkillsDto } from './dto/update-skills-dto';
import { SkillsParams } from './interfaces/skills-params.interface';
import { Skills, SkillsDocument } from './skills.model';

@Injectable()
export class SkillsService {
  private logger = new Logger('Logger - Skills Controller');
  constructor(
    @InjectModel(Skills.name)
    private readonly skillsModel: Model<SkillsDocument>,
  ) {}

  async createSkills(createSkillsDto: CreateSkillsDto, response) {
    // create a new model with dto
    const comments = new this.skillsModel(createSkillsDto);

    const res = await comments.save();

    // return response
    response
      .status(HttpStatus.CREATED)
      .json({ message: 'Successfully Created Skill', post: res });
  }

  async updateSkills(updateSkillDto: UpdateSkillsDto, response) {
    const { skill: skillId } = updateSkillDto;
    this.logger.verbose(`skill id is: ${skillId}`);
    const existingSkill = await this.skillsModel.findByIdAndUpdate(skillId, {
      skillname: [...updateSkillDto.skillname],
    });

    // return response
    response
      .status(HttpStatus.CREATED)
      .json({ message: 'Successfully Updated Skill', post: existingSkill });
  }

  // get all skills
  async getSkills() {
    const skills = await this.skillsModel.find();

    return skills;
  }

  // get skills of an author
  async getSkillsOfIndividual(skillsParams: SkillsParams) {
    const { authorId } = skillsParams;
    const skills = await this.skillsModel.find({ author: authorId });

    return skills;
  }
}
