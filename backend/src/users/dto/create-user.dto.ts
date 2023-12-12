import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @ApiProperty()
  username: string;

  @IsNotEmpty()
  @ApiProperty()
  role: string;

  @IsNotEmpty()
  @ApiProperty()
  password: string;
}
