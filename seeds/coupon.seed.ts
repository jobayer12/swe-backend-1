import { Coupon } from "../src/entities/Coupon";
import { DataSource, EntityManager } from "typeorm";
import { rewards } from './reward.seed';
import { Reward } from "../src/entities/Reward";

export const coupons = [
  {
    id: 1,
    value: 'Coupon1',
    Reward: rewards[0] as Reward
  },
  {
    id: 2,
    value: 'Coupon2',
    Reward: rewards[0] as Reward
  },
];

export async function runCouponSeed(dataSource: DataSource) {
  const couponRepository = dataSource.getRepository(Coupon);
  for (const data of coupons) {
    const coupon = couponRepository.create(data);
    await couponRepository.save(coupon);
  }
}