import { InjectRepository } from '@nestjs/typeorm';
import { Reward } from '../../entities/Reward';
import { LessThan, LessThanOrEqual, MoreThanOrEqual, Repository } from 'typeorm';
import { AddRewardDto } from './dto/add-reward.dto';
import { Injectable } from '@nestjs/common';
import { RewardFilter } from './dto/filter/reward.filter';
import { SearchCondition } from 'src/common/enum/SearchCondition';

@Injectable()
export class RewardService {
  constructor(@InjectRepository(Reward)
  private rewardRepository: Repository<Reward>,) { }


  async addReward(payload: AddRewardDto): Promise<Reward> {
    try {
      return this.rewardRepository.save(payload);
    } catch (error) {
      throw new Error(`Failed to save reward due to ${error?.message}`);
    }
  }

  async get(filter: RewardFilter): Promise<Reward> {
    const sql = this.rewardRepository.createQueryBuilder('reward');

    if (filter) {
      if (filter?.id) {
        if (filter?.id?.condition === SearchCondition.EQUAL) {
          sql.andWhere('reward.id = :id', { id: filter?.id?.value });
        } else if (filter?.id?.condition === SearchCondition.IN && Array.isArray(filter?.id?.value) && filter?.id?.value?.length > 0) {
          sql.andWhere('reward.id IN :id', { id: filter?.id?.value });
        } else if (filter?.id?.condition === SearchCondition.GREATER_THAN) {
          sql.andWhere('reward.id > :id', { id: filter?.id?.value })
        } else if (filter?.id?.condition === SearchCondition.LESS_THAN) {
          sql.andWhere('reward.id < :id', { id: filter?.id?.value })
        }
      }

      if (filter?.date?.value?.startDate && filter?.date?.value?.endDate) {
        if (filter?.date?.condition === SearchCondition.BETWEEN) {
          sql.andWhere({
            endDate: MoreThanOrEqual(filter?.date.value.startDate),
            startDate: LessThanOrEqual(filter?.date.value.endDate),
          });
        }
      }
    }
    return sql.getOne();
  }
}