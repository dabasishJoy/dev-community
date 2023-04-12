import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IDeveloper } from 'src/developer/interfaces/developer.interface';
import { CreateExperienceDto } from './dto/create-experience-dto';
import { UpdateExperienceDto } from './dto/update-experience-dto';
import { IExperienceParams } from './interfaces/experience-params.interface';
import { IUpdateExperienceParams } from './interfaces/update-experience-params.interface';
import { Experience, ExperienceDocument } from './schemas/experience.schema';

@Injectable()
export class ExperienceService {
  logger = new Logger();
  constructor(
    @InjectModel(Experience.name)
    private readonly experienceModel: Model<ExperienceDocument>,
  ) {}

  // get new object created for create experience
  async getConstructExperience(
    createExperienceDto: CreateExperienceDto,
    developer: IDeveloper,
  ): Promise<any> {
    const newExperienceObj = {
      description: createExperienceDto.description
        ? createExperienceDto.description
        : '',

      years: createExperienceDto.years ? createExperienceDto.years : '',
      field: createExperienceDto.field ? createExperienceDto.field : '',
      authorId: developer._id ? developer._id : '',
    };

    return newExperienceObj;
  }

  // create experience
  async createExperience(
    createExperienceDto: CreateExperienceDto,
    developer: IDeveloper,
  ) {
    this.logger.verbose(createExperienceDto);

    const newExperience = await this.getConstructExperience(
      createExperienceDto,
      developer,
    );
    // create model and save on db
    return await this.experienceModel.create(newExperience);
  }

  // get experience of an user
  async getExperiences(experienceParams: IExperienceParams) {
    const { authorId } = experienceParams;

    const experiences = await this.experienceModel.find({ authorId: authorId });

    return experiences;
  }

  // update experience
  async updateExperience(
    updateExperienceParams: IUpdateExperienceParams,
    updateExperienceDto: UpdateExperienceDto,
  ) {
    // this.logger.verbose(experienceParams);

    const res = await this.experienceModel.findByIdAndUpdate(
      updateExperienceParams.experienceId,
      updateExperienceDto,
    );

    return res;
  }
}
