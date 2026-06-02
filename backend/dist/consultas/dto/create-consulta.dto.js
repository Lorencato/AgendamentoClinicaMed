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
exports.CreateConsultaDto = void 0;
const class_validator_1 = require("class-validator");
const consulta_entity_1 = require("../consulta.entity");
class CreateConsultaDto {
}
exports.CreateConsultaDto = CreateConsultaDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Data e hora são obrigatórias' }),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], CreateConsultaDto.prototype, "dataHora", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'Paciente é obrigatório' }),
    __metadata("design:type", Number)
], CreateConsultaDto.prototype, "pacienteId", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'Médico é obrigatório' }),
    __metadata("design:type", Number)
], CreateConsultaDto.prototype, "medicoId", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(consulta_entity_1.StatusConsulta),
    __metadata("design:type", String)
], CreateConsultaDto.prototype, "status", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateConsultaDto.prototype, "observacoes", void 0);
//# sourceMappingURL=create-consulta.dto.js.map