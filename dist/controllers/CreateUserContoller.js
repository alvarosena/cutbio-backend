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
exports.CreateUserContoller = void 0;
const tsyringe_1 = require("tsyringe");
const CreateUserService_1 = require("../services/CreateUserService");
class CreateUserContoller {
    handle(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { username, email, password } = request.body;
                const createUserService = tsyringe_1.container.resolve(CreateUserService_1.CreateUserService);
                const user = yield createUserService.execute(username, email, password);
                return response.json(user);
            }
            catch (error) {
                const errorMessage = 'Error: Username already taken.';
                error = errorMessage;
                return response.status(400).json(error);
            }
        });
    }
}
exports.CreateUserContoller = CreateUserContoller;
//# sourceMappingURL=CreateUserContoller.js.map