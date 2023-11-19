import { ApiProperty } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';

export class Job implements Prisma.JobUncheckedCreateInput {
  @ApiProperty()
  id: number;

  @ApiProperty()
  title: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  requirements: string;

  @ApiProperty()
  applicationFormLink: string;

  @ApiProperty()
  companyLogo: string;

  @ApiProperty()
  applicationDeadline: string | Date;

  @ApiProperty()
  startDate: string | Date;

  @ApiProperty()
  endDate: string | Date;

  @ApiProperty()
  createdAt?: string | Date;

  @ApiProperty()
  updatedAt?: string | Date;
}
