import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { SendGridService } from '../../utils/sendgrid.service';
import { CreateContactDto } from '../dto/createContactUs.dto';
import { Contact } from '@prisma/client';

@Injectable()
export class EmailService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly sendGridService: SendGridService,
  ) {}

  async sendEmail(contactData: CreateContactDto): Promise<Object> {
    const { name, email, phone, message, subject } = contactData;

    const sentContact = await this.prisma.contact.create({
      data: { name, email, phone, message, subject, received: false },
    });
    if(!sentContact){
      return "Network error please try again"
    }
    await this.sendGridService.sendEmail(contactData);

    return sentContact;
  }

  async receiveEmail(contactData: CreateContactDto): Promise<Object> {
    const { name, email, phone, message, subject } = contactData;

    const sentContact = await this.prisma.contact.create({
      data: { name, email, phone, message, subject, received: true },
    });
    if(!sentContact){
      return "Network error please try again"
    }
    await this.sendGridService.sendEmail(contactData);
    await this.sendGridService.resEmail(email, { name, message });
    return
  }

  async getAllReceivedEmails(subject?: string): Promise<Contact[]> {
    return this.prisma.contact.findMany({
      where: { received: true, subject: subject || undefined },
      orderBy: { createdAt: 'desc' },
    });
  }

  async getEmailById(id: number): Promise<Contact | null> {
    return this.prisma.contact.findUnique({ where: { id } });
  }

  async getAllSentEmails(subject?: string): Promise<Contact[]> {
    return this.prisma.contact.findMany({
      where: { received: false, subject: subject || undefined },
      orderBy: { createdAt: 'desc' },
    });
  }
}
