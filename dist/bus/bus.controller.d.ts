import { Bus } from './bus.entity';
import { BusService } from './bus.service';
export declare class BusController {
    private service;
    constructor(service: BusService);
    getAll(): Bus[];
    createGet(): Promise<Bus>;
    getById(parametre: any): Promise<any>;
    getByIdHour(parametre: any): Bus;
    create(input: any): Promise<Bus>;
}
