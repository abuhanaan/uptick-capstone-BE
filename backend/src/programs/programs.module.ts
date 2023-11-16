import { Module } from '@nestjs/common';
import { ProgramsService } from './services/programs.service';
import { ProgramsController } from './controllers/programs.controller'
import { PrismaModule } from '../prisma/prisma.module';;

@Module({
  imports: [PrismaModule],
  controllers: [ProgramsController],
  providers: [ProgramsService],
})
export class ProgramsModule {}
