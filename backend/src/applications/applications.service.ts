import {
  BadRequestException,
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateApplicationDto } from './dto/create-application.dto';
import { UpdateApplicationDto } from './dto/update-application.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { ConfigService } from '@nestjs/config';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { Application, Job, Program } from '@prisma/client';
import { ProgramsService } from 'src/programs/services/programs.service';

@Injectable()
export class ApplicationsService {
  private readonly s3Client = new S3Client({
    region: this.configService.getOrThrow('AWS_S3_REGION'),
  });
  constructor(
    private prisma: PrismaService,
    private readonly configService: ConfigService,
  ) {}

  async checkApplicationUniqueness(application: Application) {
    if (!application) {
      throw new NotFoundException('Application Not Found');
    }
  }

  async checkIfProgramExists(program: Program) {
    if (program === null) {
      throw new NotFoundException('Program Not Found');
    }
  }

  async checkIfJobExists(job: Job) {
    if (!job) {
      throw new HttpException('Job Not Found', HttpStatus.NOT_FOUND);
    }
  }

  async create(
    createApplicationDto: CreateApplicationDto,
    fileName: string,
    file: Buffer,
  ) {
    try {
      if (
        createApplicationDto.programPreferenceID &&
        createApplicationDto.jobAppliedForID
      ) {
        throw new BadRequestException(
          'You can only apply for one application type',
        );
      }

      let existingJobApplication: Application,
        existingProgramApplication: Application;

      if (createApplicationDto.type === 'program') {
        createApplicationDto.programPreferenceID =
          +createApplicationDto.programPreferenceID;
        const id = createApplicationDto.programPreferenceID;
        const program = await this.prisma.program.findUnique({ where: { id } });
        this.checkIfProgramExists(program);

        createApplicationDto.jobAppliedForID = null;
        existingProgramApplication = await this.prisma.application.findFirst({
          where: {
            AND: [
              { email: createApplicationDto.email },
              {
                programPreferenceID: +createApplicationDto.programPreferenceID,
              },
            ],
          },
        });
      }
      if (createApplicationDto.type === 'job') {
        createApplicationDto.jobAppliedForID =
          +createApplicationDto.jobAppliedForID;
        const id = createApplicationDto.jobAppliedForID;
        const job = await this.prisma.job.findUnique({ where: { id } });
        this.checkIfJobExists(job);

        createApplicationDto.programPreferenceID = null;
        existingJobApplication = await this.prisma.application.findFirst({
          where: {
            AND: [
              { email: createApplicationDto.email },
              { jobAppliedForID: +createApplicationDto.jobAppliedForID },
            ],
          },
        });
      }

      if (existingJobApplication || existingProgramApplication) {
        throw new ConflictException('This application already exist');
      }

      await this.s3Client.send(
        new PutObjectCommand({
          Bucket: this.configService.getOrThrow('S3_BUCKET_NAME'),
          Key: fileName,
          Body: file,
        }),
      );
      const newApplicationDTO = { ...createApplicationDto };
      +newApplicationDTO.programPreferenceID;

      newApplicationDTO.resume = `${this.configService.getOrThrow(
        'S3_BASE_URL',
      )}/${fileName}`;

      return this.prisma.application.create({ data: newApplicationDTO });
    } catch (error) {
      console.log(error);
      throw new Error('Failed To Create Application');
    }
  }

  findAll() {
    try {
      return this.prisma.application.findMany();
    } catch (error) {
      console.log(error);
      throw new Error('Could not get any application');
    }
  }

  async findOne(id: number) {
    const application = await this.prisma.application.findUnique({
      where: { id },
    });

    await this.checkApplicationUniqueness(application);
    try {
      return this.prisma.application.findUnique({ where: { id } });
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }

  async update(id: number, updateApplicationDto: UpdateApplicationDto) {
    const application = await this.prisma.application.findUnique({
      where: { id },
    });

    await this.checkApplicationUniqueness(application);
    try {
      return this.prisma.application.update({
        where: { id },
        data: updateApplicationDto,
      });
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }

  async remove(id: number) {
    const application = await this.prisma.application.findUnique({
      where: { id },
    });

    await this.checkApplicationUniqueness(application);
    try {
      return this.prisma.application.delete({ where: { id } });
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }
}
