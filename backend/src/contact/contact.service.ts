import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { MailService } from '../mail/mail.service';
import { CreateContactDto } from './dto/create-contact.dto';

@Injectable()
export class ContactService {
  private readonly logger = new Logger(ContactService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly mailService: MailService,
  ) {}

  async create(dto: CreateContactDto): Promise<{ message: string }> {
    // Save to database using parameterized query via Prisma ORM
    await this.prisma.contact.create({
      data: {
        name: dto.name,
        email: dto.email,
        message: dto.message,
      },
    });

    // Send notification email (fire-and-forget — don't block the response)
    this.sendNotificationEmail(dto).catch((err) => {
      this.logger.error('Failed to send contact notification email', err);
    });

    return { message: 'Thank you for reaching out! I will get back to you soon.' };
  }

  private async sendNotificationEmail(dto: CreateContactDto): Promise<void> {
    await this.mailService.send({
      to: 'meeshlabs@gmail.com',
      subject: `New Contact Form Submission from ${dto.name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${this.escapeHtml(dto.name)}</p>
        <p><strong>Email:</strong> ${this.escapeHtml(dto.email)}</p>
        <p><strong>Message:</strong></p>
        <p>${this.escapeHtml(dto.message)}</p>
      `,
    });
  }

  /**
   * Escapes HTML special characters to prevent XSS when
   * user-provided data is embedded in the notification email body.
   */
  private escapeHtml(str: string): string {
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }
}
