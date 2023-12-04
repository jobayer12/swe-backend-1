import { PlayerCoupon } from "../src/entities/PlayerCoupon";
import { coupons } from './coupon.seed'
import { DataSource } from "typeorm";
import { players } from "./player.seed";
import { Coupon } from "../src/entities/Coupon";
import { Player } from "../src/entities/Player";

export const playerCoupons: PlayerCoupon[] = [
  {
    id: 1,
    redeemedAt: new Date(),
    coupon: coupons[0] as Coupon,
    player: players[0] as Player,
  },
];

export async function runPlayerCouponSeed(dataSource: DataSource) {
  const playerCouponRepository = dataSource.getRepository(PlayerCoupon);
  for (let playerCoupon of playerCoupons) {
    const pc = playerCouponRepository.create(playerCoupon);
    await playerCouponRepository.save(pc);
  }
}