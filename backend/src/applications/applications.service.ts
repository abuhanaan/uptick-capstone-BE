import { Injectable } from '@nestjs/common';
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

  async create(
    createApplicationDto: CreateApplicationDto,
    fileName: string,
    file: Buffer,
  ) {
    await this.s3Client.send(
      new PutObjectCommand({
        Bucket: '460624858521-nestjs-uploader',
        Key: fileName,
        Body: file,
      }),
    );
    const newDTO = { ...createApplicationDto };
    newDTO.resume = `${this.configService.getOrThrow(
      'S3_BASE_URL',
    )}/${fileName}`;
    return this.prisma.application.create({ data: newDTO });
  }

  findAll() {
    return `This action returns all applications`;
  }

  findOne(id: number) {
    return `This action returns a #${id} application`;
  }

  update(id: number, updateApplicationDto: UpdateApplicationDto) {
    return `This action updates a #${id} application`;
  }

  remove(id: number) {
    return `This action removes a #${id} application`;
  }
}
