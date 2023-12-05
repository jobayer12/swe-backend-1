import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PlayerCoupon } from '../../entities/PlayerCoupon';
import { MoreThanOrEqual, Repository } from 'typeorm';
import { PlayerCouponFilter } from './dto/player-coupon.filter';
import { SearchCondition } from '../../common/enum/SearchCondition';
import { AddPlayerCouponDto } from './dto/add-player-coupon.dto';
import { PlayerService } from '../player/player.service';
import { CouponService } from '../coupon/coupon.service';
import { CouponFilter, IdFilter } from '../coupon/dto/coupon.filter';
import { validate } from 'class-validator';

@Injectable()
export class PlayerCouponService {
  constructor(
    @InjectRepository(PlayerCoupon)
    private playerCouponRepository: Repository<PlayerCoupon>,
    private readonly playerService: PlayerService,
    private readonly couponService: CouponService,
  ) {}

  async get(filter: PlayerCouponFilter): Promise<Array<PlayerCoupon>> {
    const sql = this.playerCouponRepository
      .createQueryBuilder('player_coupon')
      .innerJoinAndSelect('player_coupon.player', 'player')
      .innerJoinAndSelect('player_coupon.coupon', 'coupon');

    if (filter) {
      if (filter?.id) {
        if (filter?.id?.condition === SearchCondition.EQUAL) {
          sql.andWhere('player_coupon.id = :id', { id: filter?.id?.value });
        } else if (
          filter?.id?.condition === SearchCondition.IN &&
          Array.isArray(filter?.id?.value) &&
          filter?.id?.value?.length > 0
        ) {
          sql.andWhere('player_coupon.id IN :id', { id: filter?.id?.value });
        }
      }

      if (filter?.player) {
        if (filter?.player?.condition === SearchCondition.EQUAL) {
          sql.andWhere('player_coupon.playerId = :playerId', {
            playerId: filter?.player?.value,
          });
        } else if (
          filter?.player?.condition === SearchCondition.IN &&
          Array.isArray(filter?.player?.value) &&
          filter?.player?.value?.length > 0
        ) {
          sql.andWhere('player_coupon.playerId IN :playerId', {
            playerId: filter?.player?.value,
          });
        }
      }

      if (filter?.coupon) {
        if (filter?.player?.condition === SearchCondition.EQUAL) {
          sql.andWhere('player_coupon.couponId = :couponId', {
            couponId: filter?.coupon?.value,
          });
        } else if (
          filter?.player?.condition === SearchCondition.IN &&
          Array.isArray(filter?.coupon?.value) &&
          filter?.coupon?.value?.length > 0
        ) {
          sql.andWhere('player_coupon.couponId IN :couponId', {
            couponId: filter?.coupon?.value,
          });
        }
      }

      if (filter?.reward) {
        if (filter?.player?.condition === SearchCondition.EQUAL) {
          sql.andWhere('coupon.rewardId = :rewardId', {
            rewardId: filter?.reward?.value,
          });
        } else if (
          filter?.player?.condition === SearchCondition.IN &&
          Array.isArray(filter?.reward?.value) &&
          filter?.reward?.value?.length > 0
        ) {
          sql.andWhere('coupon.rewardId IN :rewardId', {
            rewardId: filter?.reward?.value,
          });
        }
      }

      if (filter?.redeemAt) {
        if (filter?.redeemAt?.value) {
          if (filter?.redeemAt?.condition === SearchCondition.BETWEEN) {
            sql.andWhere({
              redeemedAt: MoreThanOrEqual(filter?.redeemAt.value),
            });
          }
        }
      }
    }
    return sql.getMany();
  }

  async create(payload: AddPlayerCouponDto): Promise<PlayerCoupon> {
    try {
      const errors = await validate(payload);
      if (errors.length > 0) {
        throw new Error(errors.join(','));
      }
      const player = await this.playerService.getPlayerById(payload.playerId);
      if (!player) {
        throw new Error(`Invalid PlayerId`);
      }
      const couponFilter = new CouponFilter();
      couponFilter.id = new IdFilter(payload.couponId, SearchCondition.EQUAL);
      const coupon = await this.couponService.getCoupon(couponFilter);
      if (!coupon || coupon.length === 0) {
        throw new Error(`Invalid couponId`);
      }
      const playerCoupon = new PlayerCoupon();
      playerCoupon.coupon = coupon[0];
      playerCoupon.player = player;
      playerCoupon.redeemedAt = new Date();
      return this.playerCouponRepository.save(playerCoupon);
    } catch (e) {
      throw new HttpException(
        `Failed to create player coupon due to ${e?.message}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
