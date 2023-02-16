import { Module } from '@nestjs/common';
import { BusController } from './bus.controller';
import { BusService } from './bus.service';
import { redisModule } from 'src/module.config'; 

@Module({
  controllers: [BusController],
  providers: [BusService],
  imports: [redisModule],
})
export class BusModule {}
