import { InjectRepository } from '@nestjs/typeorm';
import { Reward } from '../../entities/Reward';
import { LessThanOrEqual, MoreThanOrEqual, Repository } from 'typeorm';
import { AddRewardDto } from './dto/add-reward.dto';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { RewardFilter } from './dto/filter/reward.filter';
import { SearchCondition } from '../../common/enum/SearchCondition';

@Injectable()
export class RewardService {
  constructor(
    @InjectRepository(Reward)
    private rewardRepository: Repository<Reward>,
  ) {}

  async addReward(payload: AddRewardDto): Promise<Reward> {
    try {
      return this.rewardRepository.save(payload);
    } catch (error) {
      throw new HttpException(
        `Failed to save reward due to ${error?.message}`,
        HttpStatus.NOT_ACCEPTABLE,
      );
    }
  }

  async get(filter: RewardFilter): Promise<Reward> {
    const sql = this.rewardRepository.createQueryBuilder('reward');

    if (filter) {
      if (filter?.id) {
        if (filter?.id?.condition === SearchCondition.EQUAL) {
          sql.andWhere('reward.id = :id', { id: filter?.id?.value });
        } else if (
          filter?.id?.condition === SearchCondition.IN &&
          Array.isArray(filter?.id?.value) &&
          filter?.id?.value?.length > 0
        ) {
          sql.andWhere('reward.id IN :id', { id: filter?.id?.value });
        }
      }

      if (filter?.date?.value?.startDate && filter?.date?.value?.endDate) {
        if (filter?.date?.condition === SearchCondition.BETWEEN) {
          sql.andWhere({
            endDate: MoreThanOrEqual(new Date(filter?.date.value.startDate)),
            startDate: LessThanOrEqual(new Date(filter?.date.value.endDate)),
          });
        }
      }
    }
    console.log(filter);
    console.log(sql.getSql());
    return sql.getOne();
  }
}
