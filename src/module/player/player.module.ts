import { Global, Module } from '@nestjs/common';
import { PlayerService } from './player.service';
import { PlayerController } from './player.controller';
import { Player } from 'src/entities/Player';
import { TypeOrmModule } from '@nestjs/typeorm';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([Player]),],
  providers: [PlayerService],
  controllers: [PlayerController],
  exports: [PlayerService]
})
export class PlayerModule { }
