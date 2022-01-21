"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListAllLinksOfUsersController = void 0;
const tsyringe_1 = require("tsyringe");
const ListAllLinksOfUsersService_1 = require("../services/ListAllLinksOfUsersService");
class ListAllLinksOfUsersController {
    async handle(request, response) {
        try {
            const { username } = request.params;
            const listAlLinksOfUsersService = tsyringe_1.container.resolve(ListAllLinksOfUsersService_1.ListAllLinksOfUsersServices);
            const links = await listAlLinksOfUsersService.execute(username);
            return response.json(links);
        }
        catch (error) {
            const errorMessage = 'Error: User not found.';
            error = errorMessage;
            return response.status(404).json(error);
        }
    }
}
exports.ListAllLinksOfUsersController = ListAllLinksOfUsersController;
