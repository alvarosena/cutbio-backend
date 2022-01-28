"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListUserInfoController = void 0;
const ListUserInfoService_1 = require("../services/ListUserInfoService");
const tsyringe_1 = require("tsyringe");
class ListUserInfoController {
    async handle(request, response) {
        try {
            const { id } = request.user;
            const { username } = request.params;
            const listUserInfoService = tsyringe_1.container.resolve(ListUserInfoService_1.ListUserInfoService);
            const user = await listUserInfoService.execute(id, username);
            return response.json(user);
        }
        catch (error) {
            return response.status(400).json(error.message);
        }
    }
}
exports.ListUserInfoController = ListUserInfoController;
