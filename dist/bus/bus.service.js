"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BusService = void 0;
const common_1 = require("@nestjs/common");
const bus_entity_1 = require("./bus.entity");
const position_entity_1 = require("../position/position.entity");
const ioredis_1 = require("ioredis");
const redis_module_1 = require("../redis.module");
let positionTest = new position_entity_1.Position();
let dateTest = new Date(2021, 12, 31, 6, 45);
positionTest.SetPosition(12, 35);
const buss = [
    {
        id: 0,
        ligne: 'C1',
        position: positionTest.GetPosition(),
        horraire: dateTest,
        arret: "Republique"
    },
    {
        id: 1,
        ligne: 'C2',
        position: positionTest.GetPosition(),
        horraire: dateTest,
        arret: "gares"
    },
    {
        id: 2,
        ligne: 'C3',
        position: positionTest.GetPosition(),
        horraire: new Date(2021, 12, 31, 10, 30),
        arret: "Republique"
    },
    {
        id: 3,
        ligne: 'C4',
        position: positionTest.GetPosition(),
        horraire: new Date(2021, 12, 31, 21, 0),
        arret: "beaulieu"
    },
];
let idKey = 0;
let BusService = class BusService {
    constructor(redisClient) {
        this.redisClient = redisClient;
    }
    async create(Newligne, longitude, latitude) {
        let newBus = new bus_entity_1.Bus();
        let newPos = new position_entity_1.Position();
        newPos.SetPosition(longitude, latitude);
        newBus.ligne = Newligne;
        newBus.position = newPos;
        try {
            await this.redisClient.multi().set(`${idKey}`, JSON.stringify(newBus)).exec();
            idKey++;
            return newBus;
        }
        catch (e) {
            console.log("Erreur dans l'ajout");
            throw new common_1.InternalServerErrorException();
        }
    }
    async getRealTimeBus(id) {
        let bus = [];
        let i = 0;
        const size = await new Promise((resolve, reject) => {
            this.redisClient.dbsize((err, size) => {
                if (err)
                    reject(err);
                resolve(size);
            });
        });
        while (i < size) {
            const value = await this.redisClient.get(`${i}`);
            const data = JSON.parse(value);
            if (data['ligne'] === id && !bus.some((busData) => busData['ligne'] === data['ligne'])) {
                bus.push(data);
            }
            i++;
        }
        return bus;
    }
    getByIdHour(idBus, horraire) {
        for (const bus of buss) {
            if (bus.arret === idBus && bus.horraire.getHours() === horraire.getHours() && bus.horraire.getMinutes() === horraire.getMinutes()) {
                return bus;
            }
        }
    }
    getAll() {
        return buss;
    }
};
BusService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(redis_module_1.IORedisKey)),
    __metadata("design:paramtypes", [ioredis_1.Redis])
], BusService);
exports.BusService = BusService;
//# sourceMappingURL=bus.service.js.map