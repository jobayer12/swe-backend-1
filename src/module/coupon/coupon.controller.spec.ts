import { Test, TestingModule } from '@nestjs/testing';
import { CouponController } from './coupon.controller';
import { CouponService } from './coupon.service';

describe('CouponController', () => {
  let controller: CouponController;
  let couponService: CouponService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CouponController],
      providers: [
        {
          provide: CouponService,
          useValue: {
            createCoupon: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<CouponController>(CouponController);
    couponService = module.get<CouponService>(CouponService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
