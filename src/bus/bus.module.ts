import { Module } from '@nestjs/common';
import { BusController } from './bus.controller';
import { BusService } from './bus.service';
import { redisModule } from 'src/module.config'; 
import { HttpModule } from '@nestjs/axios';


@Module({
  controllers: [BusController],
  providers: [BusService],
  imports: [HttpModule,redisModule],
})
export class BusModule {}
