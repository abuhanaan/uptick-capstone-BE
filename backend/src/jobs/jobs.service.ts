import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { Job } from './entities/job.entity';

@Injectable()
export class JobsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Prisma.JobCreateInput): Promise<Job> {
    const job = await this.prisma.job.create({ data });
    return job;
  }

  async findAllJobs(params?: { skip?: number; take?: number }): Promise<Job[]> {
    const { skip, take } = params;
    const programs = await this.prisma.job.findMany({
      skip,
      take,
      orderBy: { createdAt: 'desc' },
    });
    return programs;
  }

  async findOne(id: number): Promise<Job> {
    const job = await this.prisma.job.findUnique({ where: { id } });
    if (!job) {
      throw new NotFoundException(
        `The requested job doesn't exist on this server`,
      );
    }
    return job;
  }

  async update(id: number, data: Partial<Job>): Promise<Job> {
    const job = await this.prisma.job.findUnique({ where: { id } });
    if (!job) {
      throw new NotFoundException(`Job with ID doesn't exist on this server!`);
    }
    return this.prisma.job.update({ where: { id }, data });
  }

  async remove(id: number) {
    const job = await this.prisma.job.findUnique({ where: { id } });
    if (!job) {
      throw new NotFoundException(`Job with ID doesn't exist on this server`);
    }
    await this.prisma.job.delete({ where: { id } });
    return;
  }
}
