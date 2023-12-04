import { Test, TestingModule } from '@nestjs/testing';
import { PlayerService } from './player.service';
import { Repository } from 'typeorm';
import { Player } from '../../entities/Player';
import { getRepositoryToken } from '@nestjs/typeorm';
import { players } from '../../../seeds/player.seed';
import { AddPlayerDto } from './dto/add-player.dto';
import { HttpException } from '@nestjs/common';

describe('PlayerService', () => {
  let service: PlayerService;
  let playerRepository: Repository<Player>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PlayerService,
        {
          provide: getRepositoryToken(Player),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<PlayerService>(PlayerService);
    playerRepository = module.get<Repository<Player>>(getRepositoryToken(Player))
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('addPlayer', () => {
    it('should add a player successfully', async () => {
      const payload = new AddPlayerDto();
      payload.name = players[0].name;
      jest.spyOn(playerRepository, 'save').mockResolvedValue(players[0]);
      const result = await service.addPlayer(payload);
      expect(result).toEqual(players[0]);
    })
  });

  describe('addPlayer', () => {
    it('should throw an exception', async () => {
      const payload = new AddPlayerDto();
      payload.name = null;
      jest.spyOn(playerRepository, 'save').mockResolvedValue(payload[0]);
      await expect(service.addPlayer(payload)).rejects.toThrow(HttpException);
    })
  });

  describe('getPlayerById', () => {
    it('should return a player', async () => {
      jest.spyOn(playerRepository, 'findOneBy').mockResolvedValue(players[0]);
      const result = await service.getPlayerById(players[0].id);
      expect(result).toEqual(players[0]);
    });
  });
});
