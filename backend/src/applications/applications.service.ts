import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateApplicationDto } from './dto/create-application.dto';
import { UpdateApplicationDto } from './dto/update-application.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { ConfigService } from '@nestjs/config';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';

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

  async create(
    createApplicationDto: CreateApplicationDto,
    fileName: string,
    file: Buffer,
  ) {
    const existingJobApplication = await this.prisma.application.findFirst({
      where: {
        email: createApplicationDto.email,
        jobAppliedForID: createApplicationDto.jobAppliedForID,
      },
    });
    const existingProgramApplication = await this.prisma.application.findFirst({
      where: {
        email: createApplicationDto.email,
        programPreferenceID: createApplicationDto.programPreferenceID,
      },
    });
    if (existingJobApplication || existingProgramApplication) {
      throw new HttpException(
        'This application already exist',
        HttpStatus.CONFLICT,
      );
    }

    if (
      createApplicationDto.programPreferenceID &&
      createApplicationDto.jobAppliedForID
    ) {
      throw new HttpException(
        'You can only apply for one application type',
        HttpStatus.BAD_REQUEST,
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
