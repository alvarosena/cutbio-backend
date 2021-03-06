"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateUserAvatarController = void 0;
const tsyringe_1 = require("tsyringe");
const UpdateUserAvatarService_1 = require("../services/UpdateUserAvatarService");
class UpdateUserAvatarController {
    async handle(request, response) {
        var _a;
        try {
            const { username } = request.params;
            const file = (_a = request.file) === null || _a === void 0 ? void 0 : _a.filename;
            const updateUserAvatarService = tsyringe_1.container.resolve(UpdateUserAvatarService_1.UpdateUserAvatarService);
            await updateUserAvatarService.execute(username, file);
            return response.status(204).json({ message: 'Uploaded succesfully!' });
        }
        catch (error) {
            return response.json(error);
        }
    }
}
exports.UpdateUserAvatarController = UpdateUserAvatarController;
