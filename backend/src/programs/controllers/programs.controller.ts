import { Controller, Get, Query, Param, Post, Body, Put, Delete } from '@nestjs/common';
import { ProgramsService } from '../services/programs.service';
import { CreateProgramDto, UpdateProgramDto } from '../dto/program.dto';
import { ProgramEntity } from '../entities/program.entity';
import { ProgramPaginationParams } from '../../utils/paginationParams';
import { ApiBody, ApiConsumes, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Programs')
@Controller('programs')
export class ProgramsController {
  constructor(private readonly programsService: ProgramsService) {}

  @Post('create')
  // @ApiConsumes("multipart/form-data")
  @ApiOperation({ summary: 'Create a new program' })
  @ApiBody({ type: CreateProgramDto })
  @ApiResponse({ status: 201, description: 'Program created successfully', type: ProgramEntity })
  async createProgram(@Body() data: CreateProgramDto): Promise<ProgramEntity> {
      return await this.programsService.createProgram(data); 
  }

  @Get('get-programs')
  @ApiOperation({ summary: 'Get all programs' })
  @ApiResponse({ status: 200, description: 'Returns a list of programs that matches the filters'})
  async getPrograms(
    @Query() {  order_by, order_direction, type }: ProgramPaginationParams
    )
    { 
            return this.programsService.getPrograms(order_by, order_direction,type);

    }

    @Get('/available')
    @ApiOperation({ summary: 'Get all available programs' })
    async getAvailablePrograms(
      @Query() {  order_by, order_direction, type }: ProgramPaginationParams): Promise<Object> {
       {
        return await this.programsService.getAvailablePrograms(order_by, order_direction,type);
    
      } 
    }
    @Get('/unavailable')
    @ApiOperation({ summary: 'Get all closed programs' })
    async getUnavailablePrograms(
      @Query() {  order_by, order_direction, type }: ProgramPaginationParams): Promise<Object> {
       {
        return await this.programsService.getUnavailablePrograms(order_by, order_direction,type);
    
      } 
    }

  @Get(':id')
  @ApiOperation({ summary: 'Get a program by ID' })
  @ApiResponse({ status: 200, description: 'Program details' })
  async getProgramById(@Param('id') id: number): Promise<Object | null> {
     {
      return this.programsService.getProgramById(+id)
    }
  }
  
  @Put(':id')
  // @ApiConsumes("multipart/form-data")
  @ApiOperation({ summary: 'Update a program by ID' })
  @ApiBody({ type: UpdateProgramDto })
  @ApiResponse({ status: 200, description: 'Program updated successfully', type: ProgramEntity })
  async updateProgram(@Param('id') id: number, @Body() data: UpdateProgramDto): Promise<ProgramEntity | null> {
     {
      return this.programsService.updateProgram(+id, data);
    }
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a program by ID' })
  @ApiResponse({ status: 200, description: 'Program deleted successfully', type: ProgramEntity })
  async deleteProgram(@Param('id') id: number): Promise<string> {
    
      return this.programsService.deleteProgram(+id);
  
  }
}
