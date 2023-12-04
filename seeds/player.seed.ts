import { Player } from "../src/entities/Player";
import { DataSource } from "typeorm";

export const players: Player[] = [
  { id: 1, name: 'John Doe' },
  { id: 2, name: 'John cena' },
];

export async function runPlayerSeed(dataSource: DataSource) {
  const playerRepository = dataSource.getRepository(Player);
  for (let player of players) {
    const p = playerRepository.create(player);
    await playerRepository.save(p);
  }
}