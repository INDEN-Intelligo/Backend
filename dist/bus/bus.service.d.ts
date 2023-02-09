import { Bus } from './bus.entity';
export declare class BusService {
    constructor();
    create(Newligne: string, longitude: number, latitude: number): Bus;
    getById(idBus: string): Bus;
    getByIdHour(idBus: string, horraire: Date): Bus;
    getAll(): Bus[];
}
