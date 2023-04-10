import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateExperienceDto } from './dto/create-experience-dto';
import { Experience, ExperienceDocument } from './experience.model';

@Injectable()
export class ExperienceService {
  logger = new Logger();
  constructor(
    @InjectModel(Experience.name)
    private readonly experienceModel: Model<ExperienceDocument>,
  ) {}

  async createExperience(createExperienceDto: CreateExperienceDto, response) {
    this.logger.verbose(createExperienceDto);
    // create a new model with dto
    const experience = new this.experienceModel(createExperienceDto);
    this.logger.verbose(experience);
    const res = await experience.save();

    // return response
    response
      .status(HttpStatus.CREATED)
      .json({ message: 'Successfully Created Experience', Experience: res });
  }
}
