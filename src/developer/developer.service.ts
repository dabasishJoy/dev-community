import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Model, Types } from 'mongoose';
import { AuthCredentialsDto, GranType } from './dto/auth-credentials-dto';
import { CreateDeveloperDto } from './dto/create-developer-dto';
import { IDeveloper } from './interfaces/developer.interface';
import { IJwtPayload } from './interfaces/jwt-payload.interface';
import { Developer, DeveloperDocument } from './schemas/developer.schema';

@Injectable()
export class DeveloperService {
  // logger
  logger = new Logger('Developer Service');
  // initialize
  constructor(
    @InjectModel(Developer.name)
    private readonly developerModel: Model<DeveloperDocument>,
    private readonly jwtService: JwtService,
  ) {}

  // create user
  async createDeveloper(createDeveloperDto: CreateDeveloperDto): Promise<any> {
    const { password } = createDeveloperDto;

    // hash the password
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    // inject that hashed password to user data
    const updatedUserData: Developer = {
      ...createDeveloperDto,
      password: hashedPassword,
    };

    // save in db
    const res = await this.developerModel.create(updatedUserData);

    return res;
  }

  // check signin or refresh refreshToken
  async signInDeveloper(authCredentialsDto: AuthCredentialsDto): Promise<any> {
    if (authCredentialsDto.granType === GranType.refresh) {
      return await this.refreshAccessToken(authCredentialsDto);
    } else {
      return await this.signIn(authCredentialsDto);
    }
  }

  // just signin
  async signIn(authCredentialsDto: AuthCredentialsDto): Promise<any> {
    // grab email and password
    const { email, password } = authCredentialsDto;
    // find the user in db
    const existingDeveloper: IDeveloper = await this.developerModel.findOne({
      email: email,
    });

    // compare password
    if (
      existingDeveloper &&
      (await bcrypt.compare(password, existingDeveloper.password))
    ) {
      return {
        accesstoken: await this.getAccessToken(existingDeveloper),
        refreshToken: await this.getRefreshToken(existingDeveloper),
      };
    } else {
      throw new UnauthorizedException('Please check login credentials');
    }
  }

  // get refresh token
  async getRefreshToken(user: IDeveloper): Promise<any> {
    // create payload
    const payload: IJwtPayload = {
      email: user.email,
      userId: user._id,
    };

    const refreshToken = await this.jwtService.sign(payload, {
      expiresIn: process.env.JWT_REFRESH_EXPIRATION,
    });

    return refreshToken;
  }

  // get access token
  async getAccessToken(user: IDeveloper): Promise<any> {
    // create payload
    const payload: IJwtPayload = {
      email: user.email,
      userId: user._id,
    };

    // const accesstoken = await this.jwtService.sign(payload, {
    //   expiresIn: process.env.JWT_ACCESS_EXPIRATION,
    // });
    const accesstoken = await this.jwtService.sign(payload);

    return accesstoken;
  }

  // generate access token with refresh token
  async refreshAccessToken(
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<any> {
    // verify refresh token
    const { userId } = await this.jwtService.verify(
      authCredentialsDto.refreshToken,
      {
        secret: process.env.JWT_SECRET,
      },
    );

    // check user
    const user: IDeveloper = await this.developerModel.findById(userId);

    if (!user) {
      throw new UnauthorizedException('Unauthorized access');
    }

    return { accesstoken: await this.getAccessToken(user) };
  }

  // utils for find a user by id
  async findOneById(userId: Types.ObjectId): Promise<Developer> {
    return await this.developerModel.findById(userId);
  }

  // find user by field
  async findByField(field: any): Promise<Developer> {
    return await this.developerModel.findOne({ field });
  }
}
