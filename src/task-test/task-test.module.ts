import { Module } from '@nestjs/common';
import { TaskTestController } from './task-test.controller';
import { TaskTestService } from './task-test.service';

@Module({
  controllers: [TaskTestController],
  providers: [TaskTestService],
})
export class TaskTestModule {}
