import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class FilterJobsDto {
  @IsString()
  @IsOptional()
  @ApiProperty()
  title: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  requirements: string;

  @IsOptional()
  @ApiProperty()
  openJobs: boolean;

  @IsOptional()
  @ApiProperty()
  closedJobs: boolean;
}
