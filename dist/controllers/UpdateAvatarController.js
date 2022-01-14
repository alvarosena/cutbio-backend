"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateAvatarController = void 0;
const tsyringe_1 = require("tsyringe");
const UpdateAvatarService_1 = require("../services/UpdateAvatarService");
class UpdateAvatarController {
    handle(request, response) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = request.user;
                const file = (_a = request.file) === null || _a === void 0 ? void 0 : _a.filename;
                const updateAvatarService = tsyringe_1.container.resolve(UpdateAvatarService_1.UpdateAvatarService);
                yield updateAvatarService.execute(id, file);
                return response.status(204).send();
            }
            catch (error) {
                const errorMessage = 'Error: User not found.';
                error = errorMessage;
                return response.status(404).json(error);
            }
        });
    }
}
exports.UpdateAvatarController = UpdateAvatarController;
//# sourceMappingURL=UpdateAvatarController.js.map