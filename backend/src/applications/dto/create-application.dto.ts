import { ApiProperty } from '@nestjs/swagger';
import { File } from 'buffer';
import { IsEmail, IsIn, IsNotEmpty, IsNumber, IsPhoneNumber } from 'class-validator';
enum EntityType {
  Job = 'job',
  Program = 'program',
}

export class CreateApplicationDto {
  @IsNotEmpty()
  @ApiProperty()
  firstname: string;

  @IsNotEmpty()
  @ApiProperty()
  lastName: string;

  @IsNotEmpty()
  @IsEmail()
  @ApiProperty()
  email: string;

  @IsNotEmpty()
  @IsPhoneNumber('NG')
  @ApiProperty()
  phone: string;

  @IsNotEmpty()
  @ApiProperty()
  address: string;

  @IsNotEmpty()
  @ApiProperty()
  city: string;

  // @IsNotEmpty()
  // @IsNumber()
  @ApiProperty({required:false})
  yearsOfExp: string;

  @ApiProperty({ required: false })
  feStack: string;

  @ApiProperty({ required: false })
  beStack: string;

  @ApiProperty({ required: false })
  mobileStack: string;

  @ApiProperty({ required: false })
  otherStack: string;

  @IsNotEmpty()
  @ApiProperty()
  githubLink: string;

  @IsNotEmpty()
  @ApiProperty()
  careerGoals: string;

  @ApiProperty({ required: false })
  portfolioLink: string;

  @IsNotEmpty()
  @ApiProperty({})
  availability: string;

  @ApiProperty({ required: false })
  fellowshipInfo: string;

  @ApiProperty({ required: false })
  resume: string;

  @ApiProperty({
    type: 'string',
    format: 'binary',
    required: false,
  })
  file: File;

  @ApiProperty({ required: false })
  programPreferenceID: number;

  @ApiProperty({ required: false })
  jobAppliedForID: number;

  @ApiProperty({ required: false,default:"pending" })
  status: string = 'pending';

  @IsNotEmpty()
  @ApiProperty({enum: EntityType,
    default: EntityType.Program})
  type: string;
}