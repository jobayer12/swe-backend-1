import { Reward } from "../src/entities/Reward";
import { DataSource } from "typeorm";

export const rewards: Reward[] = [
  {
    id: 1,
    name: 'Airline ticket',
    perDayLimit: 3,
    totalLimit: 21,
    startDate: new Date(),
    endDate: new Date(
      new Date().setDate(new Date().getDate() + 7)
    )
  },
  {
    id: 2,
    name: 'Nike shoes',
    perDayLimit: 5,
    totalLimit: 35,
    startDate: new Date(),
    endDate: new Date(
      new Date().setDate(new Date().getDate() + 21)
    )
  },
];

export async function runRewardSeed(dataSource: DataSource) {
  const rewardRepository = dataSource.getRepository(Reward);
  for (const data of rewards) {
    const reward = rewardRepository.create(data);
    await rewardRepository.save(reward);
  }
}