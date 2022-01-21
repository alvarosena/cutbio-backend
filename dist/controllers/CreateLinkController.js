"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateLinkController = void 0;
const tsyringe_1 = require("tsyringe");
const CreateLinkService_1 = require("../services/CreateLinkService");
class CreateLinkController {
    async handle(request, response) {
        const { id: user_id } = request.user;
        const { name, url } = request.body;
        const createLinkService = tsyringe_1.container.resolve(CreateLinkService_1.CreateLinkService);
        const link = await createLinkService.execute(name, url, user_id);
        return response.json(link);
    }
}
exports.CreateLinkController = CreateLinkController;
