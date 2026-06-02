"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateConsultaDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_consulta_dto_1 = require("./create-consulta.dto");
class UpdateConsultaDto extends (0, mapped_types_1.PartialType)(create_consulta_dto_1.CreateConsultaDto) {
}
exports.UpdateConsultaDto = UpdateConsultaDto;
//# sourceMappingURL=update-consulta.dto.js.map