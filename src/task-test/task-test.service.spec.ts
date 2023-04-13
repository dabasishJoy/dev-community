import { Test, TestingModule } from '@nestjs/testing';
import { TaskTestService } from './task-test.service';

describe('TaskTestService', () => {
  let service: TaskTestService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TaskTestService],
    }).compile();

    service = module.get<TaskTestService>(TaskTestService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return a fibonacci number of a given number', async () => {
    expect(await service.calculateFibonacci(5)).toEqual(5);
  });
});
