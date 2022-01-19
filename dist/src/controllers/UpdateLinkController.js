"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateLinkController = void 0;
const UpdateLinkService_1 = require("../services/UpdateLinkService");
const tsyringe_1 = require("tsyringe");
class UpdateLinkController {
    async handle(request, response) {
        try {
            const { id } = request.params;
            const { name, url } = request.body;
            const updateLinkService = tsyringe_1.container.resolve(UpdateLinkService_1.UpdateLinkService);
            const link = await updateLinkService.execute(id, name, url);
            return response.status(204).json(link);
        }
        catch (error) {
            const errorMessage = 'Error: Link not found.';
            error = errorMessage;
            return response.status(404).json(error);
        }
    }
}
exports.UpdateLinkController = UpdateLinkController;
