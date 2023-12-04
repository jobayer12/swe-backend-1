import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Player } from '../../entities/Player';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { AddPlayerDto } from './dto/add-player.dto';

@Injectable()
export class PlayerService {

  constructor(@InjectRepository(Player) private playerRepository: Repository<Player>,) { }

  getPlayerById(id: number): Promise<Player> {
    try {
      return this.playerRepository.findOneBy({ id: id });
    } catch (e) {
      return null;
    }
  }

  addPlayer(payload: AddPlayerDto): Promise<Player> {
    try {
      return this.playerRepository.save(payload);
    } catch (error) {
      throw new HttpException(`Failed to create new player due to ${error?.message}`, HttpStatus.BAD_REQUEST);
    }
  }
}
