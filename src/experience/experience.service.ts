import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateExperienceDto } from './dto/create-experience-dto';
import { UpdateExperienceDto } from './dto/update-experience-dto';
import { ExperienceParams } from './interfaces/experience-params.interface';
import { Experience, ExperienceDocument } from './schemas/experience.schema';

@Injectable()
export class ExperienceService {
  logger = new Logger();
  constructor(
    @InjectModel(Experience.name)
    private readonly experienceModel: Model<ExperienceDocument>,
  ) {}

  // create experience
  async createExperience(createExperienceDto: CreateExperienceDto) {
    this.logger.verbose(createExperienceDto);

    // create model and save on db
    const res = await new this.experienceModel(createExperienceDto).save();

    return res;
  }

  async getExperiences() {
    const experiences = await this.experienceModel.find();

    return experiences;
  }

  // update experience
  async updateExperience(
    experienceParams: ExperienceParams,
    updateExperienceDto: UpdateExperienceDto,
  ) {
    this.logger.verbose(experienceParams);

    const res = await this.experienceModel.findByIdAndUpdate(
      experienceParams.experienceId,
      updateExperienceDto,
    );

    return res;
  }
}
