import { Body, Controller, Get, Post } from '@nestjs/common';
import { Reward } from '../../entities/Reward';
import { AddRewardDto } from './dto/add-reward.dto';
import { RewardService } from './reward.service';

@Controller('reward')
export class RewardController {
  constructor(private readonly rewardService: RewardService) { }

  @Post()
  async addReward(@Body() payload: AddRewardDto): Promise<Reward> {
    try {
      return this.rewardService.addReward(payload);
    } catch (error) {
      throw new Error(`Failed to save reward due to ${error?.message}`);
    }
  }
}
