import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IDeveloper } from 'src/developer/interfaces/developer.interface';
import { CreateSkillsDto } from './dto/create-skills-dto';
import { UpdateSkillsDto } from './dto/update-skills-dto';
import { ISkillsParams } from './interfaces/skills-params.interface';
import { IUpdateSkillsParams } from './interfaces/update-skills-params.interface';
import { Skills, SkillsDocument } from './schemas/skills.schema';

@Injectable()
export class SkillsService {
  private logger = new Logger('Logger - Skills Controller');
  constructor(
    @InjectModel(Skills.name)
    private readonly skillsModel: Model<SkillsDocument>,
  ) {}

  async getConstructSkill(
    createSkillsDto: CreateSkillsDto,
    developer: IDeveloper,
  ) {
    const newSkillsObj = {
      skillname: createSkillsDto.skillname ? createSkillsDto.skillname : '',
      authorId: developer._id ? developer._id : '',
    };

    return newSkillsObj;
  }

  // create skill
  async createSkills(
    createSkillsDto: CreateSkillsDto,
    developer: IDeveloper,
  ): Promise<any> {
    // get skills object
    const newSkills = await this.getConstructSkill(createSkillsDto, developer);

    // create a new model with dto
    return await this.skillsModel.create(newSkills);
  }

  // update skill
  async updateSkills(
    updateSkillDto: UpdateSkillsDto,
    updateSkillsParams: IUpdateSkillsParams,
  ): Promise<any> {
    const { skillId } = updateSkillsParams;

    // find from db and update
    const res = await this.skillsModel.findByIdAndUpdate(
      skillId,
      updateSkillDto,
    );

    // return response
    return res;
  }

  // get all skills
  async getSkills() {
    const res = await this.skillsModel.find();

    return res;
  }

  // get skills of an author
  async getSkillsOfIndividual(skillsParams: ISkillsParams) {
    const { authorId } = skillsParams;
    const res = await this.skillsModel.find({ authorId: authorId });

    return res;
  }
}
