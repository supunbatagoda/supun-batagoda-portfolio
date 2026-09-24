import { Body, Controller, HttpCode, HttpStatus, Post, Res } from '@nestjs/common';
import type { Response } from 'express';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { SubscriptionsService } from './subscriptions.service';

@Controller('subscriptions')
export class SubscriptionsController {
  constructor(private readonly subscriptionsService: SubscriptionsService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  async create(
    @Body() createSubscriptionDto: CreateSubscriptionDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const result = await this.subscriptionsService.subscribe(
      createSubscriptionDto,
    );

    res.status(result.created ? HttpStatus.CREATED : HttpStatus.OK);

    return { message: result.message };
  }
}
