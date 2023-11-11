import { PartialType } from '@nestjs/mapped-types';
import { CreateApplicationDto } from './create-application.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateApplicationDto extends PartialType(CreateApplicationDto) {
  @ApiProperty()
  status?: string;
}
