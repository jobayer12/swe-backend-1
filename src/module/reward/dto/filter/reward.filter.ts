import { Type } from 'class-transformer';
import { BaseFilter } from '../../../../common/filter/BaseFilter';
import { IsDateString, IsOptional, ValidateNested } from 'class-validator';
import { SearchCondition } from '../../../../common/enum/SearchCondition';

export class RewardIdFilter extends BaseFilter {
  constructor(value: number | number[], condition: SearchCondition) {
    super(value, condition);
  }

  value: number | number[];
}

export class RewardDate {
  @IsDateString()
  startDate: string;

  @IsDateString()
  endDate: string;
}

export class RewardDateFilter extends BaseFilter {
  constructor(value: RewardDate, condition: SearchCondition) {
    super(value, condition);
  }

  @Type(() => RewardDate)
  value: RewardDate;
}

export class RewardFilter {
  @IsOptional()
  @ValidateNested()
  @Type(() => RewardIdFilter)
  id: RewardIdFilter;

  @IsOptional()
  @ValidateNested()
  @Type(() => RewardDateFilter)
  date: RewardDateFilter;
}
