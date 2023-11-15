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
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { Job } from './entities/job.entity';

@ApiTags('Jobs')
@Controller('jobs')
export class JobsController {
  constructor(private readonly jobsService: JobsService) {}

  @Post()
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
  findAll(
    @Query('skip', new DefaultValuePipe(0), ParseIntPipe) skip?: number,
    @Query('take', new DefaultValuePipe(0), ParseIntPipe) take?: number,
  ): Promise<Job[]> {
    return this.jobsService.findAllJobs(skip, take);
  }

  @ApiOkResponse({ type: Job })
  @ApiNotFoundResponse({
    description: `The requested job doesn't exist on this server`,
  })
  @Get(':id')
  findOne(@Param('id') id: string): Promise<Job> {
    return this.jobsService.findOne(+id);
  }

  @ApiBody({ type: UpdateJobDto })
  @ApiNotFoundResponse({
    description: `Job with ID doesn't exist on this server!`,
  })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateJobDto: UpdateJobDto,
  ): Promise<Job> {
    return this.jobsService.update(+id, updateJobDto);
  }

  @Delete(':id')
  @ApiNotFoundResponse({
    description: `Job with ID doesn't exist on this server`,
  })
  @ApiOkResponse({ description: 'job deleted succesfully!' })
  async remove(@Res() res: Response, @Param('id') id: string) {
    await this.jobsService.remove(+id);
    res.json({ msg: 'job deleted succesfully!' });
  }
}
