import { IsDateString, IsOptional, ValidateNested } from 'class-validator';
import { SearchCondition } from '../../../common/enum/SearchCondition';
import { BaseFilter } from '../../../common/filter/BaseFilter';
import { Type } from 'class-transformer';
import { RewardIdFilter } from '../../../module/reward/dto/filter/reward.filter';

export class PlayerFilter extends BaseFilter {
  constructor(value: number | number[], condition: SearchCondition) {
    super(value, condition);
  }
  value: number | number[];
}

export class CouponFilter extends BaseFilter {
  constructor(value: number | number[], condition: SearchCondition) {
    super(value, condition);
  }
  value: number | number[];
}

export class IdFilter extends BaseFilter {
  constructor(value: number | number[], condition: SearchCondition) {
    super(value, condition);
  }
  value: number | number[];
}

export class RedeemAtFilter extends BaseFilter {
  constructor(value: Date, condition: SearchCondition) {
    super(value, condition);
  }

  @IsDateString()
  value: Date;
}

export class PlayerCouponFilter {
  @IsOptional()
  @ValidateNested()
  @Type(() => IdFilter)
  id: IdFilter;

  @IsOptional()
  @ValidateNested()
  @Type(() => PlayerFilter)
  player: PlayerFilter;

  @IsOptional()
  @ValidateNested()
  @Type(() => CouponFilter)
  coupon: CouponFilter;

  @IsOptional()
  @ValidateNested()
  @Type(() => RewardIdFilter)
  reward: RewardIdFilter;

  @IsOptional()
  @ValidateNested()
  @Type(() => RedeemAtFilter)
  redeemAt: RedeemAtFilter;
}
