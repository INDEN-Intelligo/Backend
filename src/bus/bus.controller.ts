import { Body, Controller, Get, HttpException, Param, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { Bus } from './bus.entity';
import { BusService } from './bus.service';



@Controller('bus')
export class BusController {

    constructor(private service: BusService){}

    @Get()
    getAll(): Bus[]{   
        return this.service.getAll();
    }

    /*@Get('station/bus')
    async getBusStation(): Promise<any>{   
        return this.service.getAllBusStation();
    }*/
    @Get('creation')
    @ApiCreatedResponse({description: 'The user has been successfully created.'})
    async createGet(): Promise<Bus> {
      return this.service.create('C7',12.0,13.0);
    }

    @ApiTags('Get')
    @Get(':id')
    async getById(@Param() parametre): Promise<any>{
      return this.service.getRealTimeBus(parametre.id);
    }

    @ApiTags('Get')
    @Get('bytime/:id/:timestamp')
    getByIdHour(@Param() parametre): Bus{  
      let busId = this.service.getByIdHour(parametre.id,parametre.timestamp);
      if(busId === undefined || busId === null){
        throw new HttpException('Could not find a bus with the id ${parametre.id}', 404);
      }
      return busId;
    }

    @ApiTags('Création')
    @Post()
    @ApiCreatedResponse({description: 'The user has been successfully created.'})
    async create(@Body() input: any): Promise<Bus> {
      return this.service.create(input.ligne,input.longitude,input.latitude);
    }
}
