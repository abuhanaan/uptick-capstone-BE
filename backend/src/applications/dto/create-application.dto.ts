import { ApiProperty } from '@nestjs/swagger';
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

  @ApiProperty()
  resume: string;

  @ApiProperty()
  programPreferenceID: number;

  @ApiProperty()
  jobAppliedForID: number;

  @ApiProperty()
  status: string = 'pending';

  @IsNotEmpty()
  @IsIn(['job', 'program'])
  @ApiProperty()
  type: string;
}
