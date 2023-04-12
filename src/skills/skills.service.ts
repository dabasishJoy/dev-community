import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateSkillsDto } from './dto/create-skills-dto';
import { UpdateSkillsDto } from './dto/update-skills-dto';
import { SkillsParams } from './interfaces/skills-params.interface';
import { Skills, SkillsDocument } from './schemas/skills.schema';

@Injectable()
export class SkillsService {
  private logger = new Logger('Logger - Skills Controller');
  constructor(
    @InjectModel(Skills.name)
    private readonly skillsModel: Model<SkillsDocument>,
  ) {}

  // create skill
  async createSkills(createSkillsDto: CreateSkillsDto): Promise<any> {
    // create a new model with dto
    const res = await new this.skillsModel(createSkillsDto).save();

    // return response
    return res;
  }

  // update skill
  async updateSkills(updateSkillDto: UpdateSkillsDto): Promise<any> {
    const { skill: skillId } = updateSkillDto;
    this.logger.verbose(`skill id is: ${skillId}`);
    const res = await this.skillsModel.findByIdAndUpdate(skillId, {
      skillname: [...updateSkillDto.skillname],
    });

    // return response
    return res;
  }

  // get all skills
  async getSkills() {
    const res = await this.skillsModel.find();

    return res;
  }

  // get skills of an author
  async getSkillsOfIndividual(skillsParams: SkillsParams) {
    const { authorId } = skillsParams;
    const res = await this.skillsModel.find({ author: authorId });

    return res;
  }
}
