import { IsDateString, IsNumber } from "class-validator";

export class AddPlayerCouponDto {
  @IsNumber()
  playerId: number;

  @IsNumber()
  couponId: number;

  @IsDateString()
  redeemedAt: Date;
}