import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class AddCouponRedeemDto {
  @ApiProperty()
  @IsNumber()
  playerId: number;

  @ApiProperty()
  @IsNumber()
  rewardId: number;
}

export class CouponRedeemResponseDto {
  @ApiProperty()
  @IsNumber()
  id: number;

  @ApiProperty()
  @IsString()
  value: string;
}
