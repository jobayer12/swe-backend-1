import { Test, TestingModule } from '@nestjs/testing';
import { RewardController } from './reward.controller';
import { RewardService } from './reward.service';

describe('RewardController', () => {
  let controller: RewardController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RewardController],
      providers: [
        {
          provide: RewardService,
          useValue: {
            addReward: jest.fn,
          },
        },
      ],
    }).compile();

    controller = module.get<RewardController>(RewardController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
