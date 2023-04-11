import {
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateExperienceDto } from './dto/create-experience-dto';
import { UpdateExperienceDto } from './dto/update-experience-dto';
import { Experience, ExperienceDocument } from './experience.model';
import { ExperienceParams } from './interfaces/experience-params.interface';

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

  async getExperiences() {
    const experiences = await this.experienceModel.find();

    return experiences;
  }

  async updateExperience(
    experienceParams: ExperienceParams,
    updateExperienceDto: UpdateExperienceDto,
  ) {
    try {
      this.logger.verbose(experienceParams);

      const res = await this.experienceModel.findByIdAndUpdate(
        experienceParams.experienceId,
        updateExperienceDto,
      );

      return res;
    } catch (err) {
      console.log(err);
      throw new InternalServerErrorException('Internal Server Errror');
    }
  }
}
