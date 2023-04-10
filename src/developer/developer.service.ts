import {
  BadRequestException,
  HttpStatus,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import { JwtPayload } from 'src/developer/interfaces/jwt-payload.interface';
import { Developer, DeveloperDocument } from './developer.model';
import { AuthCredentialsDto } from './dto/auth-credentials-dto';
import { CreateDeveloperDto } from './dto/create-developer-dto';
import { RefreshAccessTokenDto } from './dto/refresh-access-token-dto';
import { RefreshToken, RefreshTokenDocument } from './refresh-token.model';

@Injectable()
export class DeveloperService {
  // logger
  logger = new Logger('Developer Service');
  // initialize
  constructor(
    @InjectModel(Developer.name)
    private readonly developerModel: Model<DeveloperDocument>,
    @InjectModel(RefreshToken.name)
    private readonly refreshTokenModel: Model<RefreshTokenDocument>,
    private readonly jwtService: JwtService,
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

      // return response
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

  //   sign in user
  // signin
  async signInDeveloper(
    authCredentialsDto: AuthCredentialsDto,
    response,
  ): Promise<void> {
    try {
      // grab email and password
      const { email, password } = authCredentialsDto;
      // find the user in db
      const existingDeveloper = await this.developerModel.findOne({
        email: email,
      });

      // if user exists verify the password by comparing
      if (
        existingDeveloper &&
        (await bcrypt.compare(password, existingDeveloper.password))
      ) {
        // sign jwt token
        //   define payload
        const payload: JwtPayload = {
          email,
          username: existingDeveloper.userName,
        };

        //   get the token
        const accesstoken = await this.jwtService.sign(payload);
        const refreshToken = await this.jwtService.sign(payload, {
          expiresIn: '30d',
        });

        // save in db
        const refreshTokenInDb = new this.refreshTokenModel({
          email,
          refreshToken,
        });

        await refreshTokenInDb.save();
        // return { accesstoken };

        // return response
        response
          .status(HttpStatus.OK)
          .json({ message: 'Login Successfull', accesstoken, refreshToken });
      } else {
        throw new UnauthorizedException('Please check login credentials');
      }
    } catch (err) {
      console.log(err);

      //   return response
      response
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: 'Server Error' });
    }
  }
  // refresh access token
  async refreshAccessToken(
    refreshAccessTokenDto: RefreshAccessTokenDto,
    response,
  ) {
    const { email } = await this.refreshTokenModel.findOne({
      refreshToken: refreshAccessTokenDto.refreshToken,
    });

    // console.log(refreshToken, email);

    const user = await this.developerModel.findOne({ email: email });
    if (!user) {
      throw new BadRequestException('Bad request');
    }

    // //   define payload
    const payload: JwtPayload = {
      email,
      username: user.userName,
    };

    // //   get the token
    const accesstoken = await this.jwtService.sign(payload);
    response.status(HttpStatus.CREATED).json({ accesstoken: accesstoken });
  }

  // find a user by email
  async findOneByEmail(email: string): Promise<Developer> {
    const developer = await this.developerModel.findOne({ email: email });
    return developer;
  }
}
