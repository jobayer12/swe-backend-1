import { Body, Controller, HttpException, HttpStatus, Post } from '@nestjs/common';
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
      throw new HttpException(error?.message, HttpStatus.BAD_REQUEST);
    }
  }
}
