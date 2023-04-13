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

  //   async addition(n1: number, n2: number): Promise<number> {
  //     if(n1)
  //   }

  //   merge sort
  async mergeSort(arr: number[]): Promise<number[]> {
    if (arr.length <= 1) {
      return arr;
    }
    const mid = Math.floor(arr.length / 2);
    const leftArr = arr.slice(0, mid);
    const rightArr = arr.slice(mid);
    const leftSorted = await this.mergeSort(leftArr);
    const rightSorted = await this.mergeSort(rightArr);
    return await this.merge(leftSorted, rightSorted);
  }

  //   merge part
  async merge(leftArr: number[], rightArr: number[]): Promise<number[]> {
    const mergedArr: number[] = [];
    let leftIndex = 0;
    let rightIndex = 0;
    while (leftIndex < leftArr.length && rightIndex < rightArr.length) {
      if (leftArr[leftIndex] < rightArr[rightIndex]) {
        mergedArr.push(leftArr[leftIndex++]);
      } else {
        mergedArr.push(rightArr[rightIndex++]);
      }
    }
    return mergedArr
      .concat(leftArr.slice(leftIndex))
      .concat(rightArr.slice(rightIndex));
  }

  //   factorial
  factorial(n: number): number {
    // base case of 0 or 1
    if (n === 0 || n === 1) {
      return 1;
    }

    // Recursively calculate the factorial for n-1
    return n * this.factorial(n - 1);
  }

  rectangleArea(width: number, height: number): number {
    // Handle the case of negative inputs
    if (width < 0 || height < 0) {
      throw new Error('Width and height must be non-negative.');
    }

    return width * height;
  }
}
