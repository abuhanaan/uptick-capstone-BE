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
