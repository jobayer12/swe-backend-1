import { Test, TestingModule } from '@nestjs/testing';
import { CouponService } from './coupon.service';
import { Repository } from 'typeorm';
import { Coupon } from '../../entities/Coupon';
import { RewardService } from '../reward/reward.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { coupons } from '../../../seeds/coupon.seed';
import { AddCouponDto } from './dto/add-coupon.dto';
import { HttpException } from '@nestjs/common';

describe('CouponService', () => {
  let service: CouponService;
  let couponRepository: Repository<Coupon>;
  let rewardService: RewardService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CouponService,
        {
          provide: RewardService,
          useValue: {
            get: jest.fn
          }
        },
        {
          provide: getRepositoryToken(Coupon),
          useClass: Repository
        }
      ],
    }).compile();

    service = module.get<CouponService>(CouponService);
    couponRepository = module.get<Repository<Coupon>>(getRepositoryToken(Coupon));
    rewardService = module.get<RewardService>(RewardService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('addCoupon', () => {
    it('should add a coupon successfully', async () => {
      const payload = new AddCouponDto();
      payload.value = coupons[0].value;
      payload.rewardId = coupons[0].Reward.id;
      jest.spyOn(couponRepository, 'save').mockResolvedValue(coupons[0]);
      const result = await service.createCoupon(payload);
      expect(result).toEqual(coupons[0]);
    })
  });

  describe('addCoupon', () => {
    it('should throw an exception', async () => {
      const payload = new AddCouponDto();
      payload.value = coupons[0].value;
      payload.rewardId = 0;
      jest.spyOn(couponRepository, 'save').mockResolvedValue(coupons[0]);
      await expect(service.createCoupon(payload)).rejects.toThrow(HttpException);
    })
  });
});
