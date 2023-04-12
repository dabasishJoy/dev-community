import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import { JwtPayload } from 'src/developer/interfaces/jwt-payload.interface';
import { v4 as uuid } from 'uuid';
import { AuthCredentialsDto, GranType } from './dto/auth-credentials-dto';
import { CreateDeveloperDto } from './dto/create-developer-dto';
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

  //   create user
  async createDeveloper(createDeveloperDto: CreateDeveloperDto): Promise<any> {
    const { password } = createDeveloperDto;

    // hash the password
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    //   inject that hashed password to user data
    const updatedUserData = {
      ...createDeveloperDto,
      password: hashedPassword,
      userId: uuid(),
    };

    // save in db
    const res = await new this.developerModel(updatedUserData).save();

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
    const existingDeveloper = await this.developerModel.findOne({
      email: email,
    });

    // compare password
    if (
      existingDeveloper &&
      (await bcrypt.compare(password, existingDeveloper.password))
    ) {
      // get access token
      const accesstoken = await this.getAccressToken(existingDeveloper);
      // get refresh token
      const refreshToken = await this.getRefreshToken(existingDeveloper);

      return { accesstoken: accesstoken, refreshToken: refreshToken };
    } else {
      throw new UnauthorizedException('Please check login credentials');
    }
  }

  // get refresh token
  async getRefreshToken(user: Developer): Promise<any> {
    const payload: JwtPayload = {
      userName: user.userName,
      email: user.email,
      userId: user.userId,
    };

    const refreshToken = await this.jwtService.sign(payload, {
      expiresIn: process.env.JWT_REFRESH_EXPIRATION,
    });

    return refreshToken;
  }
  // get access token
  async getAccressToken(user: Developer): Promise<any> {
    const payload: JwtPayload = {
      userName: user.userName,
      email: user.email,
      userId: user.userId,
    };

    const accesstoken = await this.jwtService.sign(payload);
    return accesstoken;
  }

  // generate access token with refresh token
  async refreshAccessToken(authCredentialsDto: AuthCredentialsDto) {
    // verify refresh token
    const { userId, email } = await this.jwtService.verify(
      authCredentialsDto.refreshToken,
      {
        secret: process.env.JWT_SECRET,
      },
    );

    // console.log(_id  );
    // check user
    const user = await this.developerModel.findOne({ userId: userId });

    if (!user && user.email !== email) {
      throw new UnauthorizedException('Unauthorized access');
    }

    const accesstoken = await this.getAccressToken(user);

    return { accesstoken };
  }

  async findOneById(userId: string): Promise<Developer> {
    const developer = await this.developerModel.findById(userId);
    return developer;
  }

  async findByField(field: any): Promise<Developer> {
    const developer = await this.developerModel.findOne({ field });

    return developer;
  }
}
