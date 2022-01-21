"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListAllUsersController = void 0;
const tsyringe_1 = require("tsyringe");
const ListAllUsersService_1 = require("../services/ListAllUsersService");
class ListAllUsersController {
    async handle(request, response) {
        try {
            const listAllUsersService = tsyringe_1.container.resolve(ListAllUsersService_1.ListAllUsersServices);
            const users = await listAllUsersService.execute();
            return response.json(users);
        }
        catch (error) {
            const errorMessage = "Error";
            error = errorMessage;
            return response.status(400).json(error);
        }
    }
}
exports.ListAllUsersController = ListAllUsersController;
