"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const pacientes_module_1 = require("./pacientes/pacientes.module");
const medicos_module_1 = require("./medicos/medicos.module");
const consultas_module_1 = require("./consultas/consultas.module");
const paciente_entity_1 = require("./pacientes/paciente.entity");
const medico_entity_1 = require("./medicos/medico.entity");
const consulta_entity_1 = require("./consultas/consulta.entity");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({ isGlobal: true }),
            typeorm_1.TypeOrmModule.forRootAsync({
                imports: [config_1.ConfigModule],
                inject: [config_1.ConfigService],
                useFactory: (config) => ({
                    type: 'mysql',
                    host: config.get('DB_HOST', 'localhost'),
                    port: parseInt(config.get('DB_PORT', '3306')),
                    username: config.get('DB_USERNAME', 'root'),
                    password: config.get('DB_PASSWORD', ''),
                    database: config.get('DB_DATABASE', 'clinica_db'),
                    entities: [paciente_entity_1.Paciente, medico_entity_1.Medico, consulta_entity_1.Consulta],
                    synchronize: true,
                }),
            }),
            pacientes_module_1.PacientesModule,
            medicos_module_1.MedicosModule,
            consultas_module_1.ConsultasModule,
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map