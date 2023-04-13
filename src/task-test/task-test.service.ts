import { BadRequestException, Injectable } from '@nestjs/common';

@Injectable()
export class TaskTestService {
  async calculateFibonacci(n: number): Promise<number> {
    if (n <= 0) {
      throw new BadRequestException(
        'Invalid input. n should be a positive integer.',
      );
    }
    let prev = 0;
    let curr = 1;
    for (let i = 2; i <= n; i++) {
      const next = prev + curr;
      prev = curr;
      curr = next;
    }
    return curr;
  }
}
