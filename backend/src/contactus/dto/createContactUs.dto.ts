import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateContactDto {
  @ApiProperty({})
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @ApiProperty({})
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @ApiProperty({})
  @IsOptional()
  @IsString()
  readonly phone?: string;

  @ApiProperty({})
  @IsNotEmpty()
  @IsString()
  readonly subject: string;
  
  @ApiProperty({})
  @IsNotEmpty()
  @IsString()
  readonly message: string;
}
