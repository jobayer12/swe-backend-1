import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString, MaxLength, Min } from "class-validator";

export class AddCouponDto {
  @ApiProperty({ example: 'coupon1' })
  @IsString()
  @MaxLength(255)
  value: string;

  @ApiProperty({ example: 1 })
  @IsNumber()
  @Min(1)
  rewardId: number;
}