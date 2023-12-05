import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import typeorm from './typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RewardModule } from './module/reward/reward.module';
import { CouponModule } from './module/coupon/coupon.module';
import { PlayerCouponModule } from './module/player-coupon/player-coupon.module';
import { PlayerModule } from './module/player/player.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [typeorm],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) =>
        configService.get('typeorm'),
    }),
    CouponModule,
    RewardModule,
    PlayerModule,
    PlayerCouponModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
