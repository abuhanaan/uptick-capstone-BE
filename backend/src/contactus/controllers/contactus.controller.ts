import { Body, Controller, Get, Param, Post, Query, UseGuards, ValidationPipe } from '@nestjs/common';
import { EmailService } from '../services/contactus.service';
import { CreateContactDto } from '../dto/createContactUs.dto';
import { Contact } from '@prisma/client';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@ApiTags('Contact Us')
@Controller('contact')
export class ContactController {
  constructor(private readonly emailService: EmailService) {}

  @Post('admin/send')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async sendEmail(@Body(new ValidationPipe()) contactData: CreateContactDto): Promise<Object> {
    return this.emailService.sendEmail(contactData);
  }

  @Post('users/send')
  async receiveEmail(@Body(new ValidationPipe()) contactData: CreateContactDto): Promise<Object> {
    return this.emailService.receiveEmail(contactData);
  }

  @Get('received')
  @UseGuards(JwtAuthGuard)
  @ApiQuery({ name: 'subject', required: false })
  @ApiBearerAuth()
  async getAllReceivedEmails(@Query('subject') subject?: string): Promise<Contact[]> {
    return this.emailService.getAllReceivedEmails(subject || undefined);
  }

  @Get('sent')
  @UseGuards(JwtAuthGuard)
  @ApiQuery({ name: 'subject', required: false })
  @ApiBearerAuth()
  async getAllSentEmails(@Query('subject') subject?: string): Promise<Contact[]> {
    return this.emailService.getAllSentEmails(subject || undefined);
  }

  @Get('email/:id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async getEmailById(@Param('id') id: number): Promise<Contact | null> {
    return this.emailService.getEmailById(+id);
  }
}
