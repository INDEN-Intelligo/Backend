import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BusModule } from './bus/bus.module';
import { PositionModule } from './position/position.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [BusModule, PositionModule,ConfigModule.forRoot()],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
