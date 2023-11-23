import { Injectable } from '@nestjs/common';
import * as sgMail from '@sendgrid/mail';
import { CreateContactDto } from '../contactus/dto/createContactUs.dto';

@Injectable()
export class SendGridService {
  constructor() {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  }

  async sendEmail(contactData: CreateContactDto): Promise<void> {
    const { name, email, phone, message, subject } = contactData;

    const msg = {
      to:email,
      from: process.env.SENDGRID_EMAIL,
      subject:subject,
      text: `
        Name: ${name}
        Email: ${email}
        Phone: ${phone || 'N/A'}
        Message: ${message}
      `,
    };

    await sgMail.send(msg);
  }

  async resEmail(email, { name, message }: Pick<CreateContactDto, 'name' | 'message'>): Promise<void> {
    const confirmationEmailText = `
      Dear ${name},

      Thank you for contacting us! We have received your message:

      ${message}

      We will get back to you as soon as possible.

      Best regards,
      Upthick Talent
    `;
    const msg = {
        to:email,
        from: process.env.SENDGRID_EMAIL,
        subject: 'Confirmation: Contact Form Submission',
        text: confirmationEmailText,
      };
      
    await sgMail.send(msg);
  }
}
