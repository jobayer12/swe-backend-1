import { Test, TestingModule } from '@nestjs/testing';
import { PlayerCouponService } from './player-coupon.service';
import { PlayerCoupon } from '../../entities/PlayerCoupon';
import { Repository } from 'typeorm';
import { PlayerService } from '../player/player.service';
import { CouponService } from '../coupon/coupon.service';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('PlayerCouponService', () => {
  let service: PlayerCouponService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PlayerCouponService,
        {
          provide: PlayerService,
          useValue: {
            getPlayerById: jest.fn,
          },
        },
        {
          provide: CouponService,
          useValue: {
            getCoupon: jest.fn,
          },
        },
        {
          provide: getRepositoryToken(PlayerCoupon),
          useClass: Repository,
        },
      ],
      imports: [],
    }).compile();

    service = module.get<PlayerCouponService>(PlayerCouponService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
