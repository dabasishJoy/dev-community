import { JwtService } from '@nestjs/jwt';
import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { DeveloperService } from './developer.service';
import { AuthCredentialsDto, GranType } from './dto/auth-credentials-dto';
import { CreateDeveloperDto } from './dto/create-developer-dto';
import { IDeveloper } from './interfaces/developer.interface';
import { Developer } from './schemas/developer.schema';

// Define the test suite
describe('DeveloperService', () => {
  const mockDeveloperModel = {
    create: jest.fn().mockResolvedValue({
      _id: '123',
      fname: 'John',
      lname: 'Doe',
      email: 'john@example.com',
      phone: '1234567890',
      password: 'hashedpassword',
    }),
    findOne: jest.fn().mockResolvedValue({
      _id: '123',
      fname: 'John',
      lname: 'Doe',
      email: 'john@example.com',
      phone: '1234567890',
      password: 'hashedpassword',
    }),
    findById: jest.fn().mockResolvedValue({
      _id: '123',
      fname: 'John',
      lname: 'Doe',
      email: 'john@example.com',
      phone: '1234567890',
      password: 'hashedpassword',
    }),
  };

  const mockJwtService = {
    sign: jest.fn().mockReturnValue('token'),
    verify: jest.fn().mockReturnValue({
      userId: '123',
      email: 'john@example.com',
    }),
  };
  let service: DeveloperService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DeveloperService,
        {
          provide: getModelToken(Developer.name),
          useValue: mockDeveloperModel,
        },
        { provide: JwtService, useValue: mockJwtService },
      ],
    }).compile();

    service = module.get<DeveloperService>(DeveloperService);
  });

  describe('createDeveloper', () => {
    it('should create a new developer', async () => {
      const createDeveloperDto: CreateDeveloperDto = {
        fname: 'John',
        lname: 'Doe',
        email: 'john@example.com',
        phone: '1234567890',
        password: 'hashedpassword',
      };

      const result: IDeveloper = await service.createDeveloper(
        createDeveloperDto,
      );

      expect(mockDeveloperModel.create).toHaveBeenCalledWith({
        fname: 'John',
        lname: 'Doe',
        email: 'john@example.com',
        phone: '1234567890',
        password: expect.any(String),
      });

      expect(result).toEqual({
        _id: expect.any(String),
        fname: 'John',
        lname: 'Doe',
        email: 'john@example.com',
        phone: '1234567890',
        password: expect.any(String),
      });
    });
  });

  describe('Sign In Developer', () => {
    it('should return an access token and a refresh token for valid credentials', async () => {
      const authCredentialsDto: AuthCredentialsDto = {
        email: 'john@example.com',
        password: 'hashedpassword',
        granType: GranType.email,
        refreshToken:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImRhYmFzaXNoOUA2c2Vuc2UuY29tIiwidXNlcklkIjoiNjQzNjUwYTI0ODEwNGRlYTBjMjc1OTcxIiwiaWF0IjoxNjgxMjgxMjMxLCJleHAiOjE2ODM4NzMyMzF9.DEW1VfFG82-orP5RYsPWY_kIQPzIJsghI98Fggn2yO0',
      };

      const result = await service.signIn(authCredentialsDto);

      expect(result.accesstoken).toBeDefined();
      expect(result.refreshToken).toBeDefined();
    });
  });
});
