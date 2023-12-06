import { ApiProperty } from '@nestjs/swagger';
import { File } from 'buffer';
import { Type } from 'class-transformer';
import { IsArray, IsBoolean, IsDate, IsString } from 'class-validator';

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
