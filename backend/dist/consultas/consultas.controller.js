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
exports.ConsultasController = void 0;
const common_1 = require("@nestjs/common");
const consultas_service_1 = require("./consultas.service");
const create_consulta_dto_1 = require("./dto/create-consulta.dto");
const update_consulta_dto_1 = require("./dto/update-consulta.dto");
let ConsultasController = class ConsultasController {
    constructor(consultasService) {
        this.consultasService = consultasService;
    }
    findAll() {
        return this.consultasService.findAll();
    }
    findOne(id) {
        return this.consultasService.findOne(id);
    }
    create(dto) {
        return this.consultasService.create(dto);
    }
    update(id, dto) {
        return this.consultasService.update(id, dto);
    }
    remove(id) {
        return this.consultasService.remove(id);
    }
};
exports.ConsultasController = ConsultasController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ConsultasController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ConsultasController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_consulta_dto_1.CreateConsultaDto]),
    __metadata("design:returntype", void 0)
], ConsultasController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_consulta_dto_1.UpdateConsultaDto]),
    __metadata("design:returntype", void 0)
], ConsultasController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ConsultasController.prototype, "remove", null);
exports.ConsultasController = ConsultasController = __decorate([
    (0, common_1.Controller)('consultas'),
    __metadata("design:paramtypes", [consultas_service_1.ConsultasService])
], ConsultasController);
//# sourceMappingURL=consultas.controller.js.map