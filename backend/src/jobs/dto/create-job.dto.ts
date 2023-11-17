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
import { ApiProperty } from '@nestjs/swagger';

export class CreateJobDto {
  @IsString()
  @IsDefined()
  @ApiProperty()
  @IsNotEmpty({ message: 'title is required!' })
  title: string;

  @IsString()
  @IsDefined()
  @ApiProperty()
  @IsNotEmpty({ message: 'description is a required field!' })
  description: string;

  @IsString()
  @IsDefined()
  @ApiProperty()
  @IsNotEmpty({ message: 'requirements is a required field!' })
  requirements: string;

  @IsUrl({})
  @IsDefined()
  @ApiProperty()
  @IsNotEmpty({ message: 'applicationFormLink is a required field!' })
  applicationFormLink: string;

  @ApiProperty()
  @Type(() => Date)
  @IsDate({ message: 'Invalid applicationDeadLine format!' })
  @IsNotEmpty({ message: 'applicationDeadLine is a required field!' })
  applicationDeadline: Date;

  @ApiProperty()
  @Type(() => Date)
  @IsDate({ message: 'Invalid startDate format!' })
  @IsNotEmpty({ message: 'startDate is a required field!' })
  startDate: Date;

  @ApiProperty()
  @Type(() => Date)
  @IsDate({ message: 'Invalid endDate format!' })
  @Validate(DateNotGreaterThan, ['startDate'], {
    message: 'End date must not be less than start date',
  })
  @IsNotEmpty({ message: 'endDate is a required field!' })
  endDate: Date;

  @ApiProperty()
  companyLogo?: string;
}
