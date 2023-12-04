import { Test, TestingModule } from '@nestjs/testing';
import { PlayerCouponController } from './player-coupon.controller';

describe('PlayerCouponController', () => {
  let controller: PlayerCouponController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PlayerCouponController],
    }).compile();

    controller = module.get<PlayerCouponController>(PlayerCouponController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
