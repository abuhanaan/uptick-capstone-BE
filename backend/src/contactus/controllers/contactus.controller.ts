import { Body, Controller, Get, Param, Post, Query, ValidationPipe } from '@nestjs/common';
import { EmailService } from '../services/contactus.service';
import { CreateContactDto } from '../dto/createContactUs.dto';
import { Contact } from '@prisma/client';
import { ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiTags('Contact Us')
@Controller('contact')
export class ContactController {
  constructor(private readonly emailService: EmailService) {}

  @Post('admin/send')
  async sendEmail(@Body(new ValidationPipe()) contactData: CreateContactDto): Promise<Object> {
    return this.emailService.sendEmail(contactData);
  }

  @Post('users/send')
  async receiveEmail(@Body(new ValidationPipe()) contactData: CreateContactDto): Promise<Object> {
    return this.emailService.receiveEmail(contactData);
  }

  @Get('received')
  @ApiQuery({ name: 'subject', required: false })
  async getAllReceivedEmails(@Query('subject') subject?: string): Promise<Contact[]> {
    return this.emailService.getAllReceivedEmails(subject || undefined);
  }

  @Get('sent')
  @ApiQuery({ name: 'subject', required: false })
  async getAllSentEmails(@Query('subject') subject?: string): Promise<Contact[]> {
    return this.emailService.getAllSentEmails(subject || undefined);
  }

  @Get('email/:id')
  async getEmailById(@Param('id') id: number): Promise<Contact | null> {
    return this.emailService.getEmailById(+id);
  }
}
