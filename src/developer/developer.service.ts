import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import { Developer, DeveloperDocument } from './developer.model';
import { CreateDeveloperDto } from './dto/create-developer-dto';

@Injectable()
export class DeveloperService {
  // initialize
  constructor(
    @InjectModel(Developer.name)
    private readonly developerModel: Model<DeveloperDocument>,
  ) {}

  //   create user
  async createDeveloper(
    createDeveloperDto: CreateDeveloperDto,
    response,
  ): Promise<void> {
    try {
      const { password } = createDeveloperDto;

      // hash the password
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(password, salt);

      //   inject that hashed password to user data
      const updatedUserData = {
        ...createDeveloperDto,
        password: hashedPassword,
      };

      // create data with model
      const newUser = new this.developerModel(updatedUserData);

      // save in db
      const res = await newUser.save();

      //   return response
      response
        .status(HttpStatus.CREATED)
        .json({ message: 'Successfully Created ', developer: res });
    } catch (error) {
      console.log(error);

      //   return response
      response
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: 'Server Error' });
    }
  }
}
