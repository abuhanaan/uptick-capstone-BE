import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateApplicationDto } from './dto/create-application.dto';
import { UpdateApplicationDto } from './dto/update-application.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { ConfigService } from '@nestjs/config';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { Application } from '@prisma/client';

@Injectable()
export class ApplicationsService {
  private readonly s3Client = new S3Client({
    region: this.configService.getOrThrow('AWS_S3_REGION'),
  });
  constructor(
    private prisma: PrismaService,
    private readonly configService: ConfigService,
  ) {}

  async checkApplicationUniqueness(id: number) {
    const application = await this.prisma.application.findUnique({
      where: { id },
    });
    if (!application) {
      throw new HttpException('Application Not Found', HttpStatus.NOT_FOUND);
    }
  }

  async checkIfProgramExists(id: number) {
    const program = await this.prisma.program.findUnique({ where: { id } });
    if (!program) {
      throw new HttpException('Program Not Found', HttpStatus.NOT_FOUND);
    }
  }

  async checkIfJobExists(id: number) {
    const job = await this.prisma.job.findUnique({ where: { id } });
    if (!job) {
      throw new HttpException('Job Not Found', HttpStatus.NOT_FOUND);
    }
  }

  async create(
    createApplicationDto: CreateApplicationDto,
    fileName: string,
    file: Buffer,
  ) {
    console.log(createApplicationDto);
    console.log({
      appemeil: createApplicationDto.email,
      appProgid: createApplicationDto.programPreferenceID,
      appJobid: createApplicationDto.jobAppliedForID,
    });

    if (
      createApplicationDto.programPreferenceID &&
      createApplicationDto.jobAppliedForID
    ) {
      throw new HttpException(
        'You can only apply for one application type',
        HttpStatus.BAD_REQUEST,
      );
    }

    let existingJobApplication: Application,
      existingProgramApplication: Application;

    if (createApplicationDto.type === 'program') {
      createApplicationDto.programPreferenceID =
        +createApplicationDto.programPreferenceID;
      this.checkIfProgramExists(createApplicationDto.programPreferenceID);
      createApplicationDto.jobAppliedForID = null;
      existingProgramApplication = await this.prisma.application.findFirst({
        where: {
          AND: [
            { email: createApplicationDto.email },
            { programPreferenceID: +createApplicationDto.programPreferenceID },
          ],
        },
      });
    }
    if (createApplicationDto.type === 'job') {
      createApplicationDto.jobAppliedForID =
        +createApplicationDto.jobAppliedForID;
      this.checkIfJobExists(createApplicationDto.jobAppliedForID);
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
    console.log({
      type: typeof createApplicationDto.programPreferenceID,
      id: createApplicationDto.programPreferenceID,
    });

    console.log(createApplicationDto);
    console.log({ existingJobApplication, existingProgramApplication });
    if (existingJobApplication || existingProgramApplication) {
      throw new HttpException(
        'This application already exist',
        HttpStatus.CONFLICT,
      );
    }

    await this.s3Client.send(
      new PutObjectCommand({
        Bucket: '460624858521-nestjs-uploader',
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
  }

  findAll() {
    return this.prisma.application.findMany();
  }

  async findOne(id: number) {
    await this.checkApplicationUniqueness(id);
    return this.prisma.application.findUnique({ where: { id } });
  }

  async update(id: number, updateApplicationDto: UpdateApplicationDto) {
    await this.checkApplicationUniqueness(id);
    return this.prisma.application.update({
      where: { id },
      data: updateApplicationDto,
    });
  }

  async remove(id: number) {
    await this.checkApplicationUniqueness(id);
    return this.prisma.application.delete({ where: { id } });
  }
}
