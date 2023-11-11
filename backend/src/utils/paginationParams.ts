import { IsNumber, Min, IsEnum, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export enum OrderDirection {
  ASC = 'asc',
  DESC = 'desc'
}

export enum OrderBy {
  createdAt = 'createdAt'
}

export  class ProgramPaginationParams {
  
  @ApiProperty({ type: "string", required: false })
  @IsOptional()
  type: string

  @ApiProperty({ enum: OrderBy, default: OrderBy.createdAt })
  order_by?: OrderBy = OrderBy.createdAt;

  @ApiProperty({ enum: OrderDirection, default: OrderDirection.DESC })
  @IsEnum(OrderDirection)
  @IsOptional()
  order_direction?: OrderDirection = OrderDirection.DESC;

}
