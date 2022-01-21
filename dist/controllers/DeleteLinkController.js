"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteLinkController = void 0;
const DeleteLinkService_1 = require("../services/DeleteLinkService");
const tsyringe_1 = require("tsyringe");
class DeleteLinkController {
    async handle(request, response) {
        try {
            const { id } = request.params;
            const deleteLinkService = tsyringe_1.container.resolve(DeleteLinkService_1.DeleteLinkService);
            await deleteLinkService.execute(id);
            return response.status(204).send();
        }
        catch (error) {
            return response.json(error);
        }
    }
}
exports.DeleteLinkController = DeleteLinkController;
