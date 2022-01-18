"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateAvatarController = void 0;
const tsyringe_1 = require("tsyringe");
const UpdateAvatarService_1 = require("../services/UpdateAvatarService");
class UpdateAvatarController {
    async handle(request, response) {
        var _a;
        try {
            const { id } = request.user;
            const file = (_a = request.file) === null || _a === void 0 ? void 0 : _a.filename;
            const updateAvatarService = tsyringe_1.container.resolve(UpdateAvatarService_1.UpdateAvatarService);
            await updateAvatarService.execute(id, file);
            return response.status(204).send();
        }
        catch (error) {
            const errorMessage = 'Error: User not found.';
            error = errorMessage;
            return response.json(error);
        }
    }
}
exports.UpdateAvatarController = UpdateAvatarController;
