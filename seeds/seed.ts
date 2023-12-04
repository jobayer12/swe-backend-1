import { connectionSource } from '../src/typeorm';
import { runCouponSeed } from './coupon.seed';
import { runPlayerSeed } from './player.seed';
import { runPlayerCouponSeed } from './playerCoupon.seed';
import { runRewardSeed } from './reward.seed';

connectionSource.initialize().then(async () => {
  try {
    await runPlayerSeed(connectionSource);
    await runRewardSeed(connectionSource);
    await runCouponSeed(connectionSource);
    await runPlayerCouponSeed(connectionSource);
    console.log('Seed completed successfully');
  } catch (error) {
    console.error('Seed failed:', error)
  }
  connectionSource.destroy();
});