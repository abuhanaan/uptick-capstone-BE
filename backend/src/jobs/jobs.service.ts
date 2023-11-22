import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Job } from './entities/job.entity';
import { CreateJobDto } from './dto/create-job.dto';
import { ConfigService } from '@nestjs/config';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { FilterJobsDto } from './dto/get-all-jobs-filter.dto';

@Injectable()
export class JobsService {
  private readonly s3Client = new S3Client({
    region: this.configService.getOrThrow('AWS_S3_REGION'),
  });
  constructor(
    private readonly prisma: PrismaService,
    private readonly configService: ConfigService,
  ) {}

  private async logoUpload(filename: string, file: Buffer): Promise<string> {
    await this.s3Client.send(
      new PutObjectCommand({
        Bucket: this.configService.getOrThrow('S3_BUCKET_NAME'),
        Key: filename,
        Body: file,
      }),
    );
    const fileUrl = `${this.configService.getOrThrow(
      'S3_BASE_URL',
    )}/${filename}`;
    return fileUrl;
  }

  private buildQuery(filter: FilterJobsDto): Record<string, any> {
    const currentDate = new Date();
    const query: Record<string, any> = {
      where: { ...filter },
    };

    delete query.where.openJobs;
    delete query.where.closedJobs;

    if (filter.openJobs) {
      query.where.applicationDeadline = { gt: currentDate };
    } else if (filter.closedJobs) {
      query.where.applicationDeadline = { lt: currentDate };
    }
    console.log(query);
    return query;
  }

  async create(
    dto: CreateJobDto,
    fileName: string,
    file: Buffer,
  ): Promise<Job> {
    const companyLogo = await this.logoUpload(fileName, file);
    const data = { ...dto, companyLogo };
    const job = await this.prisma.job.create({ data });
    return job;
  }

  async findAllJobs(
    filter?: FilterJobsDto,
    Iskip?: number,
    Itake?: number,
  ): Promise<Job[]> {
    const skip = Iskip ? Iskip : 0;
    const take = Itake ? Itake : 5;
    const query = this.buildQuery(filter);
    const jobs = await this.prisma.job.findMany({
      skip,
      take,
      ...query,
      orderBy: { createdAt: 'desc' },
    });
    return jobs;
  }

  async findOne(id: number): Promise<Object> {
    const job = await this.prisma.job.findUnique({ where: { id } });
    const applications = await this.prisma.application.findMany({ where: { jobAppliedForID:id }});
    if (!job) {
      throw new NotFoundException(
        `The requested job doesn't exist on this server`,
      );
    }
    return {job,applications};
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
