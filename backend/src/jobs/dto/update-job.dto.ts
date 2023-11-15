import { PartialType } from '@nestjs/mapped-types';
import { CreateJobDto } from './create-job.dto';
import { Type } from 'class-transformer';
import {
  IsDate,
  IsDefined,
  IsNotEmpty,
  IsString,
  IsUrl,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateJobDto extends PartialType(CreateJobDto) {
  @IsString()
  @IsDefined()
  @ApiProperty()
  @IsNotEmpty({ message: 'title cannpot be empty!' })
  readonly title?: string;

  @IsString()
  @IsDefined()
  @ApiProperty()
  @IsNotEmpty({ message: 'description cannot be empty!' })
  readonly description?: string;

  @IsString()
  @IsDefined()
  @ApiProperty()
  @IsNotEmpty({ message: 'requirements cannot be empty!' })
  readonly requirements?: string;

  @IsDefined()
  @IsUrl({})
  @ApiProperty()
  @IsNotEmpty({ message: 'applicationFormLink is a required field!' })
  readonly applicationFormLink?: string;

  @Type(() => Date)
  @ApiProperty()
  @IsDate({ message: 'Invalid applicationDeadLine format!' })
  @IsNotEmpty({ message: 'applicationDeadLine is a required field!' })
  readonly applicationDeadline?: Date;

  @ApiProperty()
  @Type(() => Date)
  @IsDate({ message: 'Invalid startDate format!' })
  @IsNotEmpty({ message: 'startDate is a required field!' })
  readonly startDate?: Date;

  @ApiProperty()
  @Type(() => Date)
  @IsDate({ message: 'Invalid endDate format!' })
  @IsNotEmpty({ message: 'endDate is a required field!' })
  readonly endDate?: Date;
}
