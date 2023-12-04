import { Global, Module } from '@nestjs/common';
import { PlayerCouponController } from './player-coupon.controller';
import { PlayerCouponService } from './player-coupon.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlayerCoupon } from 'src/entities/PlayerCoupon';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([PlayerCoupon])],
  controllers: [PlayerCouponController],
  providers: [PlayerCouponService],
  exports: [PlayerCouponService],
})
export class PlayerCouponModule { }
