import { Inject, Injectable, InternalServerErrorException } from '@nestjs/common';
import { Bus } from './bus.entity';
import { Position } from '../position/position.entity';
import { Redis } from 'ioredis';
import { IORedisKey } from '../redis.module';
import { HttpService } from '@nestjs/axios';
import { AxiosResponse } from 'axios';
import { promises as fs } from 'fs';

let positionTest = new Position();
let dateTest = new Date(2021, 12, 31, 6, 45);
positionTest.SetPosition(12,35);

const buss : Bus[] = [
    {
        id: 0,
        ligne: 'C1',
        position: positionTest.GetPosition(),
        horraire : dateTest,
        arret : "Republique"
    },
    {
        id: 1,
        ligne: 'C2',
        position: positionTest.GetPosition(),
        horraire : dateTest,
        arret : "gares"

    },
    {
        id: 2,
        ligne: 'C3',
        position: positionTest.GetPosition(),
        horraire : new Date(2021, 12, 31, 10, 30),
        arret : "Republique"
    },
    {
        id: 3,
        ligne: 'C4',
        position: positionTest.GetPosition(),
        horraire : new Date(2021, 12, 31, 21, 0),
        arret : "beaulieu"
    },
]

let idKey =0;

@Injectable()
export class BusService {
    constructor( private readonly httpService: HttpService,
        @Inject(IORedisKey) private readonly redisClient: Redis,
    ){}

    async create(Newligne: string, longitude:number, latitude:number): Promise<Bus> {

        let newBus = new Bus();
        let newPos = new Position();
        newPos.SetPosition(longitude,latitude);
        newBus.ligne=Newligne;
        newBus.position=newPos;
        try {
            await this.redisClient.multi().set(`${idKey}`, JSON.stringify(newBus)).exec();
            idKey++;
            return newBus;
        } catch (e) {
            console.log("Erreur dans l'ajout");
        throw new InternalServerErrorException();
        }
    }

    async getRealTimeBus(id:string):Promise<Bus[]>{ 
        let bus: Bus[] = [];  
        if(id=="insa"){
            const response: AxiosResponse<any> = await this.httpService.get('http://localhost:8080/array?name='+1176).toPromise();
            const nextBus = response['data'];
            bus.push(nextBus);

            const response2: AxiosResponse<any> = await this.httpService.get('http://localhost:8080/array?name='+1204).toPromise();
            const nextBus2 = response2['data'];
            bus.push(nextBus2);
        }
        return bus;
    }
    


    getByIdHour(idBus:number,horraire:Date): Bus{
        for (const bus of buss) {
            if(bus.id.toString()===idBus.toString() && bus.horraire.getHours()=== horraire.getHours() && bus.horraire.getMinutes()=== horraire.getMinutes()){
                return bus;
            }
        }
        //return this.repository.findOneBy({id:(idU)});
    }

    getAll():Bus[]{
        return buss;
        //return this.repository.find();
    }


    /*
    getAllSubwayStation(){

    }

    async getAllBusStation(): Promise<any>{
        let busStation : String[];
        try {
            const data = await fs.readFile("./tco-bus-topologie-pointsarret-td.json", 'utf-8');
            const name = JSON.parse(data).nom;
            const coord = JSON.parse(data).coordonnees;

            let positionTest = new Position();
            positionTest.SetPosition(coord.lon,coord.lat);
            
            busStation.push(name);
            console.log(busStation);
            return busStation;
        } catch (err) {
            console.error(`An error occurred while reading JSON file: ${err}`);
            return null;
        }

    }

    getBusDay(days:number,hours:number,minutes:number): Bus[]{
        let buscirculating : Bus[];


        return buscirculating;
    }*/

    
}
