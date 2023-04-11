import { Test, TestingModule } from '@nestjs/testing';
import { DeveloperController } from './developer.controller';
import { DeveloperService } from './developer.service';

// mock developer service
const mockDeveloperService = () => ({
  createDeveloper: jest.fn(),
});

describe('DeveloperController', () => {
  let controller: DeveloperController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DeveloperController],
      providers: [DeveloperService],
    }).compile();

    controller = module.get<DeveloperController>(DeveloperController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
