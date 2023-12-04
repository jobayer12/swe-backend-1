import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Coupon } from '../../entities/Coupon';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AddCouponDto } from './dto/add-coupon.dto';
import { RewardService } from '../reward/reward.service';
import { RewardFilter, RewardIdFilter } from '../reward/dto/filter/reward.filter';
import { SearchCondition } from 'src/common/enum/SearchCondition';
import { CouponFilter } from './dto/coupon.filter';
import { PlayerCoupon } from '../../entities/PlayerCoupon';

@Injectable()
export class CouponService {
  constructor(@InjectRepository(Coupon) private couponRepository: Repository<Coupon>,
    private readonly rewardService: RewardService) { }

  async getCoupon(filter: CouponFilter): Promise<Array<Coupon>> {
    const sql = this.couponRepository
      .createQueryBuilder('coupon')
      .innerJoinAndSelect('coupon.Reward', 'reward');

    if (filter) {
      if (filter?.id) {
        if (filter?.id?.condition === SearchCondition.EQUAL) {
          sql.andWhere('coupon.id = :id', { id: filter?.id?.value });
        } else if (filter?.id?.condition === SearchCondition.IN && Array.isArray(filter?.id?.value) && filter?.id?.value?.length > 0) {
          sql.andWhere('coupon.id IN :id', { id: filter?.id?.value });
        } else if (filter?.id?.condition === SearchCondition.GREATER_THAN) {
          sql.andWhere('coupon.id > :id', { id: filter?.id?.value })
        } else if (filter?.id?.condition === SearchCondition.LESS_THAN) {
          sql.andWhere('coupon.id < :id', { id: filter?.id?.value })
        }
      }

      if (filter?.reward) {
        if (filter?.id?.condition === SearchCondition.EQUAL) {
          sql.andWhere('coupon.rewardId = :id', { id: filter?.reward?.value });
        } else if (filter?.reward?.condition === SearchCondition.IN && Array.isArray(filter?.reward?.value) && filter?.reward?.value?.length > 0) {
          sql.andWhere('coupon.rewardId IN :id', { id: filter?.reward?.value });
        } else if (filter?.reward?.condition === SearchCondition.GREATER_THAN) {
          sql.andWhere('coupon.rewardId > :id', { id: filter?.reward?.value })
        } else if (filter?.reward?.condition === SearchCondition.LESS_THAN) {
          sql.andWhere('coupon.rewardId < :id', { id: filter?.reward?.value })
        }
      }
    }
    return sql.getMany();
  }

  async getAvailableCouponByPlayerId(playerId: number, rewardId: number): Promise<Coupon> {
    return this.couponRepository
      .createQueryBuilder('coupon')
      .where(`coupon.rewardId = ${rewardId}`)
      .andWhere(qb => {
        const subQuery = qb
          .subQuery()
          .select('player_coupon.couponId')
          .from(PlayerCoupon, 'player_coupon')
          .where(`player_coupon.playerId = ${playerId}`)
          .getQuery();
        return `coupon.id NOT IN ${subQuery}`;
      }).getOne();
  }

  async createCoupon(payload: AddCouponDto): Promise<Coupon> {
    try {
      const filter = new RewardFilter();
      filter.id = new RewardIdFilter(payload.rewardId, SearchCondition.EQUAL);
      const reward = await this.rewardService.get(filter);
      if (!reward) {
        throw new HttpException('Invalid rewardId', HttpStatus.BAD_REQUEST);
      }

      const coupon = new Coupon();
      coupon.value = payload.value;
      coupon.Reward = reward;
      return this.couponRepository.save(coupon);
    } catch (error) {
      throw new HttpException(`Failed to save coupon due to ${error?.message}`, HttpStatus.BAD_REQUEST);
    }
  }
}
