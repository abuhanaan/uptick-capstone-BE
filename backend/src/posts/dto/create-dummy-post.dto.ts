import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsBoolean, IsDate, IsString } from 'class-validator';

export class CreateDummyPostDto {
  @IsString()
  @ApiProperty()
  title: string;

  @IsString()
  @ApiProperty()
  content: string;

  @IsString()
  @ApiProperty()
  author: string;

  @IsString()
  @ApiProperty({ required: false })
  image: string;

  // @IsBoolean()
  @ApiProperty({ type: Boolean })
  published: boolean;

  // @IsArray()
  @ApiProperty({ type: [String] })
  tags: string[];

  @IsDate()
  @ApiProperty()
  @Type(() => Date)
  @IsDate({ message: 'Invalid date format!' })
  publicationDate: Date;
}
