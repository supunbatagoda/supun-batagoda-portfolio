import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';

export interface SubscribeResult {
  message: string;
  created: boolean;
}

@Injectable()
export class SubscriptionsService {
  constructor(private readonly prisma: PrismaService) {}

  async subscribe({ email }: CreateSubscriptionDto): Promise<SubscribeResult> {
    const existing = await this.prisma.subscription.findUnique({
      where: { email },
    });

    if (existing) {
      return {
        created: false,
        message: 'This email is already subscribed.',
      };
    }

    await this.prisma.subscription.create({ data: { email } });

    return {
      created: true,
      message: "Thanks! We'll notify you when the portfolio launches.",
    };
  }
}
