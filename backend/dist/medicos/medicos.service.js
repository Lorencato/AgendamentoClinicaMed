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
exports.MedicosService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const medico_entity_1 = require("./medico.entity");
let MedicosService = class MedicosService {
    constructor(medicoRepo) {
        this.medicoRepo = medicoRepo;
    }
    async findAll() {
        return this.medicoRepo.find({ order: { nome: 'ASC' } });
    }
    async findOne(id) {
        const medico = await this.medicoRepo.findOne({ where: { id } });
        if (!medico)
            throw new common_1.NotFoundException(`Médico #${id} não encontrado`);
        return medico;
    }
    async create(dto) {
        const existe = await this.medicoRepo.findOne({ where: { crm: dto.crm } });
        if (existe)
            throw new common_1.ConflictException('CRM já cadastrado');
        const medico = this.medicoRepo.create(dto);
        return this.medicoRepo.save(medico);
    }
    async update(id, dto) {
        const medico = await this.findOne(id);
        Object.assign(medico, dto);
        return this.medicoRepo.save(medico);
    }
    async remove(id) {
        const medico = await this.findOne(id);
        await this.medicoRepo.remove(medico);
    }
};
exports.MedicosService = MedicosService;
exports.MedicosService = MedicosService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(medico_entity_1.Medico)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], MedicosService);
//# sourceMappingURL=medicos.service.js.map