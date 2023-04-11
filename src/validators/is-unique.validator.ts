// import { Injectable } from '@nestjs/common';
// import {
//   ValidationArguments,
//   ValidatorConstraint,
//   ValidatorConstraintInterface,
//   registerDecorator,
// } from 'class-validator';
// import { DeveloperService } from 'src/developer/developer.service';

// @Injectable()
// @ValidatorConstraint({ async: true })
// export class IsUnique implements ValidatorConstraintInterface {
//   constructor(private readonly developerService: DeveloperService) {}

//   async validate(value: any, args: ValidationArguments) {
//     const [field] = args.constraints;
//     const developer = await this.developerService.findByField(field);
//     return developers.length === 0;
//   }

//   defaultMessage(args: ValidationArguments) {
//     return `${args.property} already exists`;
//   }
// }

// export function IsUniqueField(field: string) {
//   return function (object: object, propertyName: string) {
//     registerDecorator({
//       target: object.constructor,
//       propertyName: propertyName,
//       options: { message: `${propertyName} already exists` },
//       constraints: [field],
//       validator: IsUnique,
//     });
//   };
// }
