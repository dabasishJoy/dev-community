import { Test, TestingModule } from '@nestjs/testing';
import { DeveloperController } from './developer.controller';
import { DeveloperService } from './developer.service';

describe('DeveloperController', () => {
  let controller: DeveloperController;

  // mock userService
  const mockUserService = {
    create: jest.fn(dto=> {})
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DeveloperController],
      providers: [DeveloperService],
    })
      .overrideProvider(DeveloperService)
      .useValue(mockUserService)
      .compile();

    controller = module.get<DeveloperController>(DeveloperController);
  });

  const createDeveloperDto = {
    fname: 'Dabaish',
    lname: 'das',
    email: 'dabsish@6sense.com',
    phone: '01576568754',
    password: '123456',
    userName: 'dab12',
  };

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  it('should create a user', () => {
    expect(controller.signinDeveoper(createDeveloperDto, {})).toEqual({message: });
  });
});
