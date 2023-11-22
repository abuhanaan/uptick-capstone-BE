import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  Query,
  ParseIntPipe,
  DefaultValuePipe,
  ValidationPipe,
  UsePipes,
  UseInterceptors,
  UploadedFile,
  ParseFilePipe,
} from '@nestjs/common';
import { JobsService } from './jobs.service';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { Response } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBody,
  ApiConsumes,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { Job } from './entities/job.entity';
import { FilterJobsDto } from './dto/get-all-jobs-filter.dto';

@ApiTags('Jobs')
@Controller('jobs')
export class JobsController {
  constructor(private readonly jobsService: JobsService) {}

  @Post()
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        title: { type: 'string' },
        description: { type: 'string' },
        requirements: { type: 'string' },
        applicationFormLink: { type: 'string' },
        applicationDeadline: { type: 'string', format: 'date-time' },
        startDate: { type: 'string', format: 'date-time' },
        endDate: { type: 'string', format: 'date-time' },
        file: { type: 'string', format: 'binary' },
      },
      required: [
        'title',
        'description',
        'requirements',
        'applicationFormLink',
        'applicationDeadline',
        'startDate',
        'endDate',
        'file',
      ],
    },
  })
  @ApiCreatedResponse({ type: Job })
  @ApiInternalServerErrorResponse()
  @UsePipes(new ValidationPipe())
  @UseInterceptors(FileInterceptor('file'))
  create(
    @Body() createJobDto: CreateJobDto,
    @UploadedFile(new ParseFilePipe({ validators: [] }))
    file: Express.Multer.File,
  ): Promise<Job> {
    return this.jobsService.create(
      createJobDto,
      file.originalname,
      file.buffer,
    );
  }

  @Get()
  @ApiQuery({ name: 'skip', required: false, type: Number })
  @ApiQuery({ name: 'take', required: false, type: Number })
  @ApiQuery({ name: 'title', required: false, type: String })
  @ApiQuery({ name: 'requirements', required: false, type: String })
  @ApiOkResponse({ type: Job, isArray: true })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
  findAll(
    @Query('skip', new DefaultValuePipe(0), ParseIntPipe) skip?: number,
    @Query('take', new DefaultValuePipe(0), ParseIntPipe) take?: number,
    @Query() filter?: FilterJobsDto,
  ): Promise<Job[]> {
    return this.jobsService.findAllJobs(filter, skip, take);
  }

  @Get('open')
  @ApiQuery({ name: 'skip', required: false, type: Number })
  @ApiQuery({ name: 'take', required: false, type: Number })
  @ApiOkResponse({ type: Job, isArray: true })
  @ApiInternalServerErrorResponse({ description: 'Internal server Error' })
  getAllOpenJobs(
    @Query('skip', new DefaultValuePipe(0), ParseIntPipe) skip?: number,
    @Query('take', new DefaultValuePipe(0), ParseIntPipe) take?: number,
  ): Promise<Job[]> {
    const filterDto = new FilterJobsDto();
    filterDto.openJobs = true;

    return this.jobsService.findAllJobs(filterDto, skip, take);
  }

  @Get('closed')
  @ApiQuery({ name: 'skip', required: false, type: Number })
  @ApiQuery({ name: 'take', required: false, type: Number })
  @ApiOkResponse({ type: Job, isArray: true })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
  getAllClosedJobs(
    @Query('skip', new DefaultValuePipe(0), ParseIntPipe) skip?: number,
    @Query('take', new DefaultValuePipe(0), ParseIntPipe) take?: number,
  ): Promise<Job[]> {
    const filterDto = new FilterJobsDto();
    filterDto.closedJobs = true;

    return this.jobsService.findAllJobs(filterDto, skip, take);
  }

  @ApiOkResponse({ type: Job })
  @ApiNotFoundResponse({
    description: `The requested job doesn't exist on this server`,
  })
  @Get(':id')
  findOne(@Param('id') id: string): Promise<Object> {
    return this.jobsService.findOne(+id);
  }

  @ApiParam({ name: 'id', type: Number, description: 'Job ID', required: true })
  @ApiOkResponse({ type: Job })
  @ApiNotFoundResponse({
    description: `Job with ID doesn't exist on this server!`,
  })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateJobDto: UpdateJobDto,
  ): Promise<Job> {
    return this.jobsService.update(+id, updateJobDto);
  }

  @Delete(':id')
  @ApiParam({ name: 'id', type: Number, description: 'Job ID', required: true })
  @ApiNotFoundResponse({
    description: `Job with ID doesn't exist on this server`,
  })
  @ApiOkResponse({ description: 'job deleted succesfully!' })
  async remove(@Res() res: Response, @Param('id') id: string) {
    await this.jobsService.remove(+id);
    res.json({ msg: 'job deleted succesfully!' });
  }
}
