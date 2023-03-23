import { Bus } from './bus.entity';
import { Redis } from 'ioredis';
export declare class BusService {
    private readonly redisClient;
    constructor(redisClient: Redis);
    create(Newligne: string, longitude: number, latitude: number): Promise<Bus>;
    getRealTimeBus(id: string): Promise<Bus[]>;
    getByIdHour(idBus: string, horraire: Date): Bus;
    getAll(): Bus[];
}
