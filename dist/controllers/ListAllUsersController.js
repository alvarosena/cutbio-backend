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
exports.ListAllUsersController = void 0;
const tsyringe_1 = require("tsyringe");
const ListAllUsersService_1 = require("../services/ListAllUsersService");
class ListAllUsersController {
    handle(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const listAllUsersService = tsyringe_1.container.resolve(ListAllUsersService_1.ListAllUsersServices);
                const users = yield listAllUsersService.execute();
                return response.json(users);
            }
            catch (error) {
                const errorMessage = "Error";
                error = errorMessage;
                return response.status(400).json(error);
            }
        });
    }
}
exports.ListAllUsersController = ListAllUsersController;
//# sourceMappingURL=ListAllUsersController.js.map