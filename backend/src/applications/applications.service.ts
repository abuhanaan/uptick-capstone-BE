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
import { CreateJobApplicationDto } from './dto/create-job-application.dto';
// import { PrismaClient } from '@prisma/client';

@Injectable()
export class ApplicationsService {
  // prisma = new PrismaClient();
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
      throw new NotFoundException('Job Not Found');
    }
  }

  async createJobApplication(
    createApplicationDto: CreateJobApplicationDto,
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

      let existingJobApplication: Application;

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

      if (existingJobApplication) {
        throw new ConflictException('You have already applied for this job');
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
      console.error('Original error:', error);
      if (error instanceof BadRequestException) {
        // console.log('Custom log message for BadRequestException');
        // Rethrow the exception to propagate the original status to the client
        throw error;
      } else if (error instanceof ConflictException) {
        // console.log('Custom log message for ConflictException');
        // Rethrow the exception to propagate the original status to the client
        throw error;
      } else if (error instanceof NotFoundException) {
        // console.log('Custom log message for ConflictException');
        // Rethrow the exception to propagate the original status to the client
        throw error;
      }
      throw new Error('Failed To Create Application');
    }
  }

  async create(createApplicationDto: CreateApplicationDto) {
    try {
      let track: string;
      if (
        createApplicationDto.programPreferenceID &&
        createApplicationDto.jobAppliedForID
      ) {
        throw new BadRequestException(
          'You can only apply for one application type',
        );
      }

      let existingProgramApplication: Application;
      let program: Program;

      if (createApplicationDto.type === 'program') {
        // createApplicationDto.programPreferenceID =
        //   +createApplicationDto.programPreferenceID;
        const id = createApplicationDto.programPreferenceID;
        program = await this.prisma.program.findUnique({ where: { id } });
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

      if (existingProgramApplication) {
        throw new ConflictException('This application already exist');
      }
      const newApplicationObj = {
        firstname: createApplicationDto.firstname,
        lastName: createApplicationDto.lastName,
        email: createApplicationDto.email,
        phone: createApplicationDto.email,
        address: createApplicationDto.address,
        city: createApplicationDto.city,
        yearsOfExp: createApplicationDto.yearsOfExp,
        feStack: createApplicationDto.feStack,
        beStack: createApplicationDto.beStack,
        mobileStack: createApplicationDto.mobileStack,
        otherStack: createApplicationDto.otherStack,
        githubLink: createApplicationDto.githubLink,
        careerGoals: createApplicationDto.careerGoals,
        portfolioLink: createApplicationDto.portfolioLink,
        availability: createApplicationDto.availability,
        fellowshipInfo: createApplicationDto.fellowshipInfo,
        resume: '',
        programType: program.type,
        programCategory: program.category,
        track: createApplicationDto.prefferedTrack,
        stack:
          track === 'backend'
            ? createApplicationDto.beStack
            : track === 'frontend'
            ? createApplicationDto.feStack
            : track === 'mobile'
            ? createApplicationDto.mobileStack
            : null,
        type: createApplicationDto.type,
        programPreferenceID: createApplicationDto.programPreferenceID,
        jobAppliedForID: null,
        status: 'pending',
      };
      console.log(newApplicationObj);
      return this.prisma.application.create({
        data: newApplicationObj,
      });
    } catch (error) {
      console.error('Original error:', error);
      if (error instanceof BadRequestException) {
        // console.log('Custom log message for BadRequestException');
        // Rethrow the exception to propagate the original status to the client
        throw error;
      } else if (error instanceof ConflictException) {
        // console.log('Custom log message for ConflictException');
        // Rethrow the exception to propagate the original status to the client
        throw error;
      } else if (error instanceof NotFoundException) {
        // console.log('Custom log message for ConflictException');
        // Rethrow the exception to propagate the original status to the client
        throw error;
      }
      throw new Error('Failed To Create Program Application');
    }
  }

  async findAll(type?: string, programCategory?: string, programType?: string) {
    try {
      if (programCategory && !type && !programType) {
        const stats = {
          'Software Engineering': 0,
          'AI & Data': 0,
          Design: 0,
          'Project Management': 0,
        };

        const categoryApplicants = await this.prisma.application.findMany({
          where: { programCategory },
        });

        if (programCategory === 'Talent Tech') {
          categoryApplicants.forEach((applicant) => {
            const category = applicant.programType;

            if (
              [
                'Software Engineering',
                'AI & Data',
                'Design',
                'Project Management',
              ].includes(category)
            ) {
              stats[category] += 1;
            }
          });
          return stats;
        }
      }
      return this.prisma.application.findMany({
        where: {
          type,
          programCategory,
          programType,
        },
      });
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
