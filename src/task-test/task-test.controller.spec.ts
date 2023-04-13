import { Test, TestingModule } from '@nestjs/testing';
import { TaskTestController } from './task-test.controller';

describe('TaskTestController', () => {
  let controller: TaskTestController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TaskTestController],
    }).compile();

    controller = module.get<TaskTestController>(TaskTestController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
