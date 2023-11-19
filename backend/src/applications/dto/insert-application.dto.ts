import { IsEmail, IsIn, IsNotEmpty, IsPhoneNumber } from 'class-validator';

export class CreateApplicationDto {
  @IsNotEmpty()
  firstname: string;

  @IsNotEmpty()
  lastName: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsPhoneNumber('NG')
  phone: string;

  @IsNotEmpty()
  address: string;

  resume: string;

  programPreferenceID: number;

  jobAppliedForID: number;

  status: string = 'pending';

  @IsNotEmpty()
  @IsIn(['job', 'program'])
  type: string;
}
