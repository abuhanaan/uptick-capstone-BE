import { Type } from 'class-transformer';
import {
  IsDate,
  IsDefined,
  IsNotEmpty,
  IsString,
  IsUrl,
  Validate,
} from 'class-validator';
import { DateNotGreaterThan } from '../decorators/date.decorator';

export class CreateJobDto {
  @IsString()
  @IsDefined()
  @IsNotEmpty({ message: 'title is required!' })
  readonly title: string;

  @IsString()
  @IsDefined()
  @IsNotEmpty({ message: 'description is a required field!' })
  readonly description: string;

  @IsString()
  @IsDefined()
  @IsNotEmpty({ message: 'requirements is a required field!' })
  readonly requirements: string;

  @IsDefined()
  @IsUrl({})
  @IsNotEmpty({ message: 'applicationFormLink is a required field!' })
  readonly applicationFormLink: string;

  @Type(() => Date)
  @IsDate({ message: 'Invalid applicationDeadLine format!' })
  @IsNotEmpty({ message: 'applicationDeadLine is a required field!' })
  readonly applicationDeadline: Date;

  @Type(() => Date)
  @IsDate({ message: 'Invalid startDate format!' })
  @IsNotEmpty({ message: 'startDate is a required field!' })
  readonly startDate: Date;

  @Type(() => Date)
  @IsDate({ message: 'Invalid endDate format!' })
  @Validate(DateNotGreaterThan, ['startDate'], {
    message: 'End date must not be less than start date',
  })
  @IsNotEmpty({ message: 'endDate is a required field!' })
  readonly endDate: Date;
}
