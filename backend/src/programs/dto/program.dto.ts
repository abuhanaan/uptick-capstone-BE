import { IsString, IsArray, IsDateString, IsOptional, ArrayNotEmpty, ArrayUnique, IsNotEmpty, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import ProgramType from '../enum/programType.enum';

export class CreateProgramDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({enum:ProgramType})
  @IsEnum(ProgramType)
  type: ProgramType;

  @ApiProperty({required:false})
  @IsArray()
  @ArrayUnique()
  curriculumOutline: string[];

  @ApiProperty({required:false})
  @IsString()
  objectives: string;

  @ApiProperty({required:false})
  @IsString()
  benefits: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  prerequisites: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  duration: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  applicationFormLink: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  enrollmentInformation: string;

@ApiProperty({})
  @IsDateString()
  startDate: Date;

  @ApiProperty({})
  @IsDateString()
  endDate: Date;
}

export class UpdateProgramDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({enum:ProgramType})
  @IsEnum(ProgramType)
  type: ProgramType;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsArray()
  @ArrayNotEmpty()
  @ArrayUnique()
  curriculumOutline?: string[];

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  objectives?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  benefits?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  prerequisites?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  duration?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  applicationFormLink?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  enrollmentInformation?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsDateString()
  startDate?: Date;

  @ApiProperty({ required: false})
  @IsOptional()
  @IsDateString()
  endDate?: Date;
}
