import { IsDateString, IsNumber, Min } from 'class-validator';

export class AddPlayerCouponDto {
  @IsNumber()
  @Min(1)
  playerId: number;

  @IsNumber()
  @Min(1)
  couponId: number;

  @IsDateString()
  redeemedAt: string;
}
