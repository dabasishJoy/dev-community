import { BadRequestException } from '@nestjs/common';
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

  describe('fibonacci series', () => {
    it('should be defined', () => {
      expect(service).toBeDefined();
    });

    it('should return a fibonacci number of a given number', async () => {
      // arrange
      const number = 5;

      // act
      const fibonacci = await service.calculateFibonacci(number);

      // assert
      expect(fibonacci).toBe(5);
    });

    it('Should throw exception with number equal to 0', async () => {
      // arrage
      const number = 0;

      // actw
      const res = () => {
        return service.calculateFibonacci(number);
      };
      // assert

      await expect(res).rejects.toBeInstanceOf(BadRequestException);
    });

    it('Should throw exception with number less than 0', async () => {
      // arrage
      const number = -5;

      // actw
      const res = () => {
        return service.calculateFibonacci(number);
      };
      // assert

      await expect(res).rejects.toBeInstanceOf(BadRequestException);
    });
  });

  describe('Merge Sort', () => {
    it('Should return the sorted array', async () => {
      // arrange
      const nums: number[] = [4, 0, 5, 2, 9];

      // act
      const result = await service.mergeSort(nums);

      // assert
      expect(result).toEqual([0, 2, 4, 5, 9]);
    });

    it('Should return the given array if the array length is 1', async () => {
      // arrange
      const nums: number[] = [4];

      // act
      const result = await service.mergeSort(nums);

      // assert
      expect(result).toEqual([4]);
    });

    it('Should return the given array if the array length is less that 1', async () => {
      // arrange
      const nums: number[] = [];

      // act
      const result = await service.mergeSort(nums);

      // assert
      expect(result).toEqual([]);
    });

    // merge function
    it('Should return the merged array if two array are given', async () => {
      // arrange
      const leftArr: number[] = [4, 7, 10];
      const rightArr: number[] = [1, 3, 8];

      // act
      const result = await service.merge(leftArr, rightArr);

      // assert
      expect(result).toEqual([1, 3, 4, 7, 8, 10]);
    });
  });

  describe('factorial', () => {
    it('should return the factorial of a number', () => {
      const number = 5;

      const factrorial = service.factorial(number);

      expect(factrorial).toEqual(120);
    });

    it('should return 1 if the number is 1', () => {
      const number = 1;

      const factrorial = service.factorial(number);

      expect(factrorial).toEqual(1);
    });

    it('should return 0 if the number is 1', () => {
      const number = 0;

      const factrorial = service.factorial(number);

      expect(factrorial).toEqual(1);
    });
  });

  describe('ractangeArea', () => {
    it('should return the area of rectangle', () => {
      expect(service.rectangleArea(0, 0)).toEqual(0);
    });

    it('should return thow an error if width or height is negative', () => {
      expect(() => service.rectangleArea(-2, 5)).toThrow(
        'Width and height must be non-negative.',
      );
    });

    it('should return thow an error if width or height is negative', () => {
      expect(() => service.rectangleArea(5, -3)).toThrow(
        'Width and height must be non-negative.',
      );
    });
  });
});
