import { Controller } from '@nestjs/common';
import { TaskTestService } from './task-test.service';

@Controller('task-test')
export class TaskTestController {
  constructor(private tastTestService: TaskTestService) {}

  async calculateFibonacci() {
    return this.tastTestService.calculateFibonacci(5);
  }
}
