import { Test, TestingModule } from '@nestjs/testing';
import { PlayerCouponService } from './player-coupon.service';
import { PlayerCoupon } from '../../entities/PlayerCoupon';
import { Repository } from 'typeorm';
import { PlayerService } from '../player/player.service';
import { CouponService } from '../coupon/coupon.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { AddPlayerCouponDto } from './dto/add-player-coupon.dto';
import { playerCoupons } from '../../../seeds/playerCoupon.seed';

describe('PlayerCouponService', () => {
  let service: PlayerCouponService;
  let playerService: PlayerService;
  let couponService: CouponService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PlayerCouponService,
        {
          provide: PlayerService,
          useValue: {
            getPlayerById: jest.fn
          }
        },
        {
          provide: CouponService,
          useValue: {
            getCoupon: jest.fn
          }
        },
        {
          provide: getRepositoryToken(PlayerCoupon),
          useClass: Repository,
        },
      ],
      imports: []
    }).compile();

    service = module.get<PlayerCouponService>(PlayerCouponService);
    playerService = module.get<PlayerService>(PlayerService);
    couponService = module.get<CouponService>(CouponService);
  });


  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
