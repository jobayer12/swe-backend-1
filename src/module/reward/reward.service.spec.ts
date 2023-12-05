// reward.service.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RewardService } from './reward.service';
import { Reward } from '../../entities/Reward';
import { AddRewardDto } from './dto/add-reward.dto';
import { HttpException } from '@nestjs/common';

describe('RewardService', () => {
  let rewardService: RewardService;
  let rewardRepository: Repository<Reward>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      providers: [
        RewardService,
        {
          provide: getRepositoryToken(Reward),
          useClass: Repository,
        },
      ],
    }).compile();

    rewardService = moduleFixture.get<RewardService>(RewardService);
    rewardRepository = moduleFixture.get<Repository<Reward>>(
      getRepositoryToken(Reward),
    );
  });

  describe('addReward', () => {
    it('should add a reward successfully', async () => {
      const payload: any = {
        id: 1,
        name: 'Airline ticket',
        startDate: new Date(),
        endDate: new Date(new Date().setDate(new Date().getDate() + 7)),
        perDayLimit: 3,
        totalLimit: 20,
      };
      jest.spyOn(rewardRepository, 'save').mockResolvedValue(payload);

      const result = await rewardService.addReward(payload);
      expect(result).toEqual(payload);
    });

    it('should throw an exception for invalid startDate', async () => {
      const invalidPayload: AddRewardDto = {
        name: 'Airline ticket',
        startDate: new Date(new Date().setDate(new Date().getDate() + 15)),
        endDate: new Date(new Date().setDate(new Date().getDate() + 14)),
        perDayLimit: 3,
        totalLimit: 21,
      };
      await expect(rewardService.addReward(invalidPayload)).rejects.toThrow(
        HttpException,
      );
    });

    it('should throw an exception for perDayLimit exceeding totalLimit', async () => {
      const invalidPayload: AddRewardDto = {
        name: 'Airline ticket',
        startDate: new Date(),
        endDate: new Date(new Date().setDate(new Date().getDate() + 7)),
        perDayLimit: 4,
        totalLimit: 3,
      };
      await expect(rewardService.addReward(invalidPayload)).rejects.toThrow(
        HttpException,
      );
    });

    it('should throw an exception for negative perDayLimit', async () => {
      const invalidPayload: AddRewardDto = {
        name: 'Airline ticket',
        startDate: new Date(),
        endDate: new Date(new Date().setDate(new Date().getDate() + 7)),
        perDayLimit: -1,
        totalLimit: 21,
      };
      await expect(rewardService.addReward(invalidPayload)).rejects.toThrow(
        HttpException,
      );
    });
  });
});
