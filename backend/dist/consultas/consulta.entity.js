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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Consulta = exports.StatusConsulta = void 0;
const typeorm_1 = require("typeorm");
const paciente_entity_1 = require("../pacientes/paciente.entity");
const medico_entity_1 = require("../medicos/medico.entity");
var StatusConsulta;
(function (StatusConsulta) {
    StatusConsulta["AGENDADA"] = "agendada";
    StatusConsulta["REALIZADA"] = "realizada";
    StatusConsulta["CANCELADA"] = "cancelada";
})(StatusConsulta || (exports.StatusConsulta = StatusConsulta = {}));
let Consulta = class Consulta {
};
exports.Consulta = Consulta;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Consulta.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'datetime' }),
    __metadata("design:type", Date)
], Consulta.prototype, "dataHora", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: StatusConsulta, default: StatusConsulta.AGENDADA }),
    __metadata("design:type", String)
], Consulta.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Consulta.prototype, "observacoes", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => paciente_entity_1.Paciente, (paciente) => paciente.consultas, { eager: true, onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'pacienteId' }),
    __metadata("design:type", paciente_entity_1.Paciente)
], Consulta.prototype, "paciente", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Consulta.prototype, "pacienteId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => medico_entity_1.Medico, (medico) => medico.consultas, { eager: true, onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'medicoId' }),
    __metadata("design:type", medico_entity_1.Medico)
], Consulta.prototype, "medico", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Consulta.prototype, "medicoId", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Consulta.prototype, "criadoEm", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Consulta.prototype, "atualizadoEm", void 0);
exports.Consulta = Consulta = __decorate([
    (0, typeorm_1.Entity)('consultas')
], Consulta);
//# sourceMappingURL=consulta.entity.js.map