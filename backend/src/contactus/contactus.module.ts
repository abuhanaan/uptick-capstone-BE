import { Module } from '@nestjs/common';
import { EmailService } from './services/contactus.service';
import { ContactController } from './controllers/contactus.controller';
import {SendGridService} from '../utils/sendgrid.service'
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [ContactController],
  providers: [EmailService,SendGridService],
  imports: [PrismaModule],
})
export class ContactusModule {}
