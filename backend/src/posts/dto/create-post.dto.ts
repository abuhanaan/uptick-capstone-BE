import { ApiProperty } from '@nestjs/swagger';
import { File } from 'buffer';
import { Type } from 'class-transformer';
import { IsArray, IsDate, IsString } from 'class-validator';

export class CreatePostDto {
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

  @ApiProperty({
    type: 'string',
    format: 'binary',
    required: true,
  })
  file: File;

  @IsString()
  published: boolean;

  @IsArray()
  @ApiProperty()
  tags: string[];

  @IsDate()
  @ApiProperty()
  @Type(() => Date)
  @IsDate({ message: 'Invalid date format!' })
  publicationDate: Date;
}
