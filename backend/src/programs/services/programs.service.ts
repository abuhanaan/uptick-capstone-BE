import { Injectable, NotFoundException, ConflictException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateProgramDto, UpdateProgramDto } from '../dto/program.dto';
import { ProgramEntity } from '../entities/program.entity';
import { OrderBy, OrderDirection } from '../../utils/paginationParams';
import { response } from 'express';

@Injectable()
export class ProgramsService {
  constructor(private readonly prisma: PrismaService) {}


  async createProgram(data: CreateProgramDto): Promise<ProgramEntity> {
    try {
      const program = await this.prisma.program.create({ data });
      return new ProgramEntity(program);
    } catch (error) {
      if (error.code === 'P2002') {
        throw new ConflictException('Program with the same name already exists');
      }
      throw new Error('Failed to create program');
    }
  }

  async getPrograms(
    order_by?: OrderBy,
    order_direction?: OrderDirection,
    type?: string
  ): Promise<Object> {
    let wherePart: { type?: string } = {};
  
    if (type) {
      wherePart.type = type;
    }
  
    try {
      let orderByField: string | undefined;
  
      if (order_by) {
        orderByField = order_by;
      }
  
      const orderByDirection = order_direction ? order_direction : 'desc';
  
      const programs = await this.prisma.program.findMany({
        where: wherePart,
        orderBy: orderByField ? { [orderByField]: orderByDirection } : undefined,
      });
  
      if (programs.length === 0) {
        throw new NotFoundException('No programs found.');
      }
  
      return { programs };
    } catch (error) {
      throw error;
    }
  }
  
  
  async getAvailablePrograms(order_by?: OrderBy,
    order_direction?: OrderDirection,
    type?: string): Promise<Object> {
      let wherePart: { type?: string } = {};
  
    if (type) {
      wherePart.type = type;
    }
    try {
      let orderByField: string | undefined;
  
      if (order_by) {
        orderByField = order_by;
      }
      const orderByDirection = order_direction ? order_direction : 'desc';
      const currentDate = new Date();
      const programs = await this.prisma.program.findMany({
        where: {
          endDate: {
            gt: currentDate,
          },
          ...wherePart,
        },
        orderBy: orderByField ? { [orderByField]: orderByDirection } : undefined,
      });

      if (programs.length === 0) {
        throw new NotFoundException('No available programs found.');
      }

      return { programs };
    } catch (error) {
      throw error;
    }
  }  
  async getUnavailablePrograms(order_by?: OrderBy,
    order_direction?: OrderDirection,
    type?: string): Promise<Object> {
      let wherePart: { type?: string } = {};
  
    if (type) {
      wherePart.type = type;
    }
    try {
      let orderByField: string | undefined;
  
      if (order_by) {
        orderByField = order_by;
      }
      const orderByDirection = order_direction ? order_direction : 'desc';
      const currentDate = new Date();
      const programs = await this.prisma.program.findMany({
        where: {
          endDate: {
            lte: currentDate,
          },
          ...wherePart,
        },
        orderBy: orderByField ? { [orderByField]: orderByDirection } : undefined,
      });

      if (programs.length === 0) {
        throw new NotFoundException('No available programs found.');
      }

      return { programs };
    } catch (error) {
      throw error;
    }
  }  
  
  

  async getProgramById(id: number): Promise<Object | null> {
    try {
      const program = await this.prisma.program.findUnique({ where: { id }});
      const applications = await this.prisma.application.findMany({ where: { programPreferenceID:id }});
      if (program==null) {
        throw new NotFoundException(`Program with ID ${id} not found`);
      }
      return {
        program,
        applications,
      };
    } catch (error) {
      throw error;
    }
  }

  async updateProgram(id: number, data: UpdateProgramDto): Promise<ProgramEntity | null> {
    const existingProgram = await this.prisma.program.findUnique({ where: { id } });
      if (existingProgram==null) {
        throw new NotFoundException(`Program with ID ${id} not found`);
      }
    try {
      // Create a partial data object with only the provided fields from the DTO
      const partialData: Record<string, unknown> = {};
      for (const key in data) {
        if (data[key] !== undefined) {
          partialData[key] = data[key];
        }
      }
  
      const updatedProgram = await this.prisma.program.update({
        where: { id },
        data: partialData,
      });
  
      return new ProgramEntity(updatedProgram);
    } catch (error) {
      throw new Error('Failed to update program');
    }
  }


  async deleteProgram(id: number): Promise<string> {
    try {
      const existingProgram = await this.prisma.program.findUnique({ where: { id } });
      if (existingProgram===null) {
        throw new NotFoundException(`Program with ID ${id} not found`);
      }
  
      await this.prisma.program.delete({ where: { id } });

      return `Program with ID ${id} has been successfully deleted`;

    } catch (error) {
      throw error
    }
  }
}