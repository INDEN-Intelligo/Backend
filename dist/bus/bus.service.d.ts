import { Bus } from './bus.entity';
import { Redis } from 'ioredis';
import { HttpService } from '@nestjs/axios';
export declare class BusService {
    private readonly httpService;
    private readonly redisClient;
    constructor(httpService: HttpService, redisClient: Redis);
    create(Newligne: string, longitude: number, latitude: number): Promise<Bus>;
    getRealTimeBus(id: string): Promise<Bus[]>;
    getByIdHour(idBus: number, horraire: Date): Bus;
    getAll(): Bus[];
}
