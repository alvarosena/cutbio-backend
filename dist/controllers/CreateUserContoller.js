"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUserContoller = void 0;
const tsyringe_1 = require("tsyringe");
const CreateUserService_1 = require("../services/CreateUserService");
class CreateUserContoller {
    async handle(request, response) {
        try {
            const { username, email, password } = request.body;
            const createUserService = tsyringe_1.container.resolve(CreateUserService_1.CreateUserService);
            const user = await createUserService.execute(username, email, password);
            return response.json(user);
        }
        catch (error) {
            const errorMessage = 'Error: Username already taken.';
            error = errorMessage;
            return response.status(400).json(error);
        }
    }
}
exports.CreateUserContoller = CreateUserContoller;
