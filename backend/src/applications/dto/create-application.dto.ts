import { ApiProperty } from '@nestjs/swagger';

export class CreateApplicationDto {
  @ApiProperty()
  firstname: string;

  @ApiProperty()
  lastName: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  phone: string;

  @ApiProperty()
  address: string;

  @ApiProperty()
  resume: string;

  @ApiProperty()
  programPreferenceID: string;

  @ApiProperty()
  jobAppliedForID: string;

  @ApiProperty()
  status: string = 'pending';
}
