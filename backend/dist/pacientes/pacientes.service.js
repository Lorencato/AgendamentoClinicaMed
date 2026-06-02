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
exports.PacientesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const paciente_entity_1 = require("./paciente.entity");
let PacientesService = class PacientesService {
    constructor(pacienteRepo) {
        this.pacienteRepo = pacienteRepo;
    }
    async findAll() {
        return this.pacienteRepo.find({ order: { nome: 'ASC' } });
    }
    async findOne(id) {
        const paciente = await this.pacienteRepo.findOne({ where: { id } });
        if (!paciente)
            throw new common_1.NotFoundException(`Paciente #${id} não encontrado`);
        return paciente;
    }
    async create(dto) {
        const existe = await this.pacienteRepo.findOne({ where: { cpf: dto.cpf } });
        if (existe)
            throw new common_1.ConflictException('CPF já cadastrado');
        const paciente = this.pacienteRepo.create(dto);
        return this.pacienteRepo.save(paciente);
    }
    async update(id, dto) {
        const paciente = await this.findOne(id);
        Object.assign(paciente, dto);
        return this.pacienteRepo.save(paciente);
    }
    async remove(id) {
        const paciente = await this.findOne(id);
        await this.pacienteRepo.remove(paciente);
    }
};
exports.PacientesService = PacientesService;
exports.PacientesService = PacientesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(paciente_entity_1.Paciente)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], PacientesService);
//# sourceMappingURL=pacientes.service.js.map