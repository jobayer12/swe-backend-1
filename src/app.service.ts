import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Player } from './entities/Player';
import { AddCouponRedeemDto, CouponRedeemResponseDto } from './dto/coupon-redeem.dto';
import { RewardService } from './module/reward/reward.service';
import { RewardDate, RewardDateFilter, RewardFilter, RewardIdFilter } from './module/reward/dto/filter/reward.filter';
import { SearchCondition } from './common/enum/SearchCondition';
import { PlayerService } from './module/player/player.service';
import { PlayerCouponService } from './module/player-coupon/player-coupon.service';
import { PlayerCouponFilter, PlayerFilter, RedeemAtFilter } from './module/player-coupon/dto/player-coupon.filter';
import { AddPlayerCouponDto } from './module/player-coupon/dto/add-player-coupon.dto';
import { CouponService } from './module/coupon/coupon.service';

@Injectable()
export class AppService {

  constructor(
    private readonly playerService: PlayerService,
    private readonly rewardService: RewardService,
    private readonly couponService: CouponService,
    private readonly playerCouponService: PlayerCouponService
  ) { }

  async couponRedeem(payload: AddCouponRedeemDto): Promise<CouponRedeemResponseDto> {
    const player: Player = await this.playerService.getPlayerById(payload.playerId);
    if (!player) {
      throw new HttpException(`Player doesn't exists.`, HttpStatus.NOT_FOUND);
    }


    const availableCoupon = await this.couponService.getAvailableCouponByPlayerId(payload.playerId, payload.rewardId);
    if (!availableCoupon) {
      throw new HttpException(`No coupon available right now.`, HttpStatus.NOT_FOUND);
    }

    const filter = new RewardFilter();
    filter.id = new RewardIdFilter(payload.rewardId, SearchCondition.EQUAL);

    const date = new Date();
    const rewardDate = new RewardDate();
    date.setHours(0, 0, 0)
    rewardDate.startDate = date;
    date.setHours(23, 59, 59);
    rewardDate.endDate = date;
    filter.date = new RewardDateFilter(rewardDate, SearchCondition.BETWEEN);

    const reward = await this.rewardService.get(filter);
    if (!reward) {
      throw new HttpException(`Reward doesn't exists.`, HttpStatus.BAD_REQUEST);
    }
    let playerCouponFilter = new PlayerCouponFilter();
    playerCouponFilter.player = new PlayerFilter(payload.playerId, SearchCondition.EQUAL);
    playerCouponFilter.reward = new RewardIdFilter(reward.id, SearchCondition.EQUAL);
    let playerCoupon = await this.playerCouponService.get(playerCouponFilter);

    if (playerCoupon?.length >= reward.totalLimit) {
      throw new HttpException(`You already used your total coupons.`, HttpStatus.NOT_FOUND);
    }

    playerCouponFilter = new PlayerCouponFilter();
    playerCouponFilter.player = new PlayerFilter(payload.playerId, SearchCondition.EQUAL);
    playerCouponFilter.redeemAt = new RedeemAtFilter(new Date(new Date().setHours(0, 0, 0)), SearchCondition.BETWEEN);
    playerCouponFilter.reward = new RewardIdFilter(reward.id, SearchCondition.EQUAL);
    playerCoupon = await this.playerCouponService.get(playerCouponFilter);

    if (+playerCoupon.length >= reward.perDayLimit) {
      throw new HttpException(`You already used your daily limit.`, HttpStatus.NOT_FOUND);
    }

    const addPlayerCouponPayload = new AddPlayerCouponDto();
    addPlayerCouponPayload.playerId = payload.playerId;
    addPlayerCouponPayload.couponId = availableCoupon.id;
    addPlayerCouponPayload.redeemedAt = new Date();
    await this.playerCouponService.create(addPlayerCouponPayload);
    const response = new CouponRedeemResponseDto();
    response.id = availableCoupon.id;
    response.value = availableCoupon.value;
    return response;
  }
}