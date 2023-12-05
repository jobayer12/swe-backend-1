import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { AppService } from './app.service';
import {
  AddCouponRedeemDto,
  CouponRedeemResponseDto,
} from './dto/coupon-redeem.dto';
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/')
  getHello(): string {
    return 'Hello World!';
  }

  @Post('coupon-redeem')
  async couponRedeem(
    @Body() payload: AddCouponRedeemDto,
  ): Promise<CouponRedeemResponseDto> {
    try {
      return this.appService.couponRedeem(payload);
    } catch (error) {
      throw new HttpException(
        `${error?.message ? error?.message : 'Failed to get coupon redeem'}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
