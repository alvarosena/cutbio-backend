"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthenticateUserController = void 0;
const tsyringe_1 = require("tsyringe");
const AuthenticateUserService_1 = require("../services/AuthenticateUserService");
class AuthenticateUserController {
    handle(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = request.body;
                const authenticateUserService = tsyringe_1.container.resolve(AuthenticateUserService_1.AuthenticateUserService);
                const token = yield authenticateUserService.execute({ email, password });
                return response.json(token);
            }
            catch (error) {
                const errorMessage = 'Error: Email or password is incorrect.';
                error = errorMessage;
                return response.status(401).json(error);
            }
        });
    }
}
exports.AuthenticateUserController = AuthenticateUserController;
//# sourceMappingURL=AuthenticateUserController.js.map