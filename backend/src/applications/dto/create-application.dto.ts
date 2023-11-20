import { ApiProperty } from '@nestjs/swagger';
import { File } from 'buffer';
import { IsEmail, IsIn, IsNotEmpty, IsPhoneNumber } from 'class-validator';

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

  @IsNotEmpty()
  @ApiProperty()
  yearsOfExp: number;

  @IsNotEmpty()
  @ApiProperty()
  feStack: string;

  @IsNotEmpty()
  @ApiProperty()
  beStack: string;

  @IsNotEmpty()
  @ApiProperty()
  mobileStack: string;

  @IsNotEmpty()
  @ApiProperty()
  otherStack: string;

  @IsNotEmpty()
  @ApiProperty()
  githubLink: string;

  @IsNotEmpty()
  @ApiProperty()
  careerGoals: string;

  @IsNotEmpty()
  @ApiProperty()
  portfolioLink: string;

  @IsNotEmpty()
  @ApiProperty()
  availability: Boolean;

  @IsNotEmpty()
  @ApiProperty()
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

  @ApiProperty({ required: false })
  status: string = 'pending';

  @IsNotEmpty()
  @IsIn(['job', 'program'])
  @ApiProperty()
  type: string;
}
