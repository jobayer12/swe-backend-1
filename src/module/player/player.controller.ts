import { Body, Controller, Post } from '@nestjs/common';
import { Player } from '../../entities/Player';
import { AddPlayerDto } from './dto/add-player.dto';
import { PlayerService } from './player.service';

@Controller('player')
export class PlayerController {
  constructor(private readonly playerService: PlayerService) {}

  @Post()
  async addPlayer(@Body() payload: AddPlayerDto): Promise<Player> {
    return this.playerService.addPlayer(payload);
  }
}
