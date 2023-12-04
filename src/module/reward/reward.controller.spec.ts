import { Test, TestingModule } from '@nestjs/testing';
import { RewardController } from './reward.controller';
import { RewardService } from './reward.service';

describe('RewardController', () => {
  let controller: RewardController;
  let rewardService: RewardService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RewardController],
      providers: [
        {
          provide: RewardService,
          useValue: {
            addReward: jest.fn
          }
        }],
    }).compile();

    controller = module.get<RewardController>(RewardController);
    rewardService = module.get<RewardService>(RewardService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
