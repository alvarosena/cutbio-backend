"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthenticateUserController = void 0;
const tsyringe_1 = require("tsyringe");
const AuthenticateUserService_1 = require("../services/AuthenticateUserService");
class AuthenticateUserController {
    async handle(request, response) {
        try {
            const { email, password } = request.body;
            const authenticateUserService = tsyringe_1.container.resolve(AuthenticateUserService_1.AuthenticateUserService);
            const token = await authenticateUserService.execute({ email, password });
            return response.json(token);
        }
        catch (error) {
            const errorMessage = 'Error: Email or password is incorrect.';
            error = errorMessage;
            return response.status(401).json(error);
        }
    }
}
exports.AuthenticateUserController = AuthenticateUserController;
