import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Resend } from 'resend';

export interface SendEmailOptions {
  to: string | string[];
  subject: string;
  html: string;
}

@Injectable()
export class MailService {
  private readonly resend: Resend;
  private readonly fromAddress: string;
  private readonly logger = new Logger(MailService.name);

  constructor(private readonly configService: ConfigService) {
    const apiKey = this.configService.get<string>('RESEND_API_KEY');
    if (!apiKey) {
      throw new Error(
        'RESEND_API_KEY environment variable is required. Set it in .env.',
      );
    }
    this.resend = new Resend(apiKey);
    this.fromAddress =
      this.configService.get<string>('RESEND_FROM_EMAIL') ??
      'onboarding@resend.dev';
  }

  /**
   * Sends an email via Resend.
   * Reusable across any module that needs email functionality.
   */
  async send(options: SendEmailOptions): Promise<void> {
    try {
      const { data, error } = await this.resend.emails.send({
        from: this.fromAddress,
        to: options.to,
        subject: options.subject,
        html: options.html,
      });

      if (error) {
        this.logger.error('Failed to send email', error);
        throw new Error(`Email sending failed: ${error.message}`);
      }

      this.logger.log(`Email sent successfully (id: ${data?.id})`);
    } catch (err) {
      this.logger.error('Email service error', err);
      throw err;
    }
  }
}
