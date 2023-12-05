import { IsOptional, ValidateNested } from 'class-validator';
import { SearchCondition } from '../../../common/enum/SearchCondition';
import { BaseFilter } from '../../../common/filter/BaseFilter';
import { Type } from 'class-transformer';
import { RewardIdFilter } from '../../reward/dto/filter/reward.filter';

export class IdFilter extends BaseFilter {
  constructor(value: number | number[], condition: SearchCondition) {
    super(value, condition);
  }
  value: number | number[];
}

export class CouponFilter {
  @IsOptional()
  @ValidateNested()
  @Type(() => IdFilter)
  id: IdFilter;

  @IsOptional()
  @ValidateNested()
  @Type(() => RewardIdFilter)
  reward: RewardIdFilter;
}
