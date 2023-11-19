import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

@ValidatorConstraint({ name: 'dateNotGreaterThan', async: false })
export class DateNotGreaterThan implements ValidatorConstraintInterface {
  validate(endDate: Date, args: ValidationArguments) {
    const [relatedPropertyName] = args.constraints;
    const startDate = args.object[relatedPropertyName];

    if (endDate && startDate) {
      return endDate > startDate;
    }

    return true;
  }

  defaultMessage(args: ValidationArguments) {
    const [relatedPropertyName] = args.constraints;
    return `${relatedPropertyName} must not be greater than or equal to ${args.property}`;
  }
}
