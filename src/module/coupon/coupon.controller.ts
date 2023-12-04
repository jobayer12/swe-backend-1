import { Body, Controller, Post } from '@nestjs/common';
import { CouponService } from './coupon.service';
import { AddCouponDto } from './dto/add-coupon.dto';
import { Coupon } from '../../entities/Coupon';

@Controller('coupon')
export class CouponController {
  constructor(private readonly couponService: CouponService) { }

  @Post()
  async createCoupon(@Body() payload: AddCouponDto): Promise<Coupon> {
    return this.couponService.createCoupon(payload);
  }
}
