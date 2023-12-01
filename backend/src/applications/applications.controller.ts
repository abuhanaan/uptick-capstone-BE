import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  ParseFilePipe,
  ParseIntPipe,
  UsePipes,
  ValidationPipe,
  UseGuards,
  BadRequestException,
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { ApplicationsService } from './applications.service';
import { CreateApplicationDto } from './dto/create-application.dto';
import { UpdateApplicationDto } from './dto/update-application.dto';
import { ApiBearerAuth, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateJobApplicationDto } from './dto/create-job-application.dto';

@Controller('applications')
@ApiTags('applications')
export class ApplicationsController {
  constructor(private readonly applicationsService: ApplicationsService) {}

  @Post('/job')
  @ApiConsumes('multipart/form-data')
  @UsePipes(new ValidationPipe())
  @UseInterceptors(FileInterceptor('file'))
  createJobApplication(
    @Body() createJobApplicationDto: CreateJobApplicationDto,
    @UploadedFile(new ParseFilePipe({ validators: [] }))
    file: Express.Multer.File,
  ) {
    return this.applicationsService.createJobApplication(
      createJobApplicationDto,
      file.originalname,
      file.buffer,
    );
  }

  @Post('/program')
  @ApiConsumes('multipart/form-data')
  @UsePipes(new ValidationPipe())
  create(@Body() createApplicationDto: CreateApplicationDto) {
    console.log('service controller');

    return this.applicationsService.create(createApplicationDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  findAll() {
    return this.applicationsService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.applicationsService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @UsePipes(new ValidationPipe())
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateApplicationDto: UpdateApplicationDto,
  ) {
    return this.applicationsService.update(id, updateApplicationDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.applicationsService.remove(id);
  }
}
