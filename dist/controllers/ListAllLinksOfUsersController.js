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
exports.ListAllLinksOfUsersController = void 0;
const tsyringe_1 = require("tsyringe");
const ListAllLinksOfUsersService_1 = require("../services/ListAllLinksOfUsersService");
class ListAllLinksOfUsersController {
    handle(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { username } = request.params;
                const listAlLinksOfUsersService = tsyringe_1.container.resolve(ListAllLinksOfUsersService_1.ListAllLinksOfUsersServices);
                const links = yield listAlLinksOfUsersService.execute(username);
                return response.json(links);
            }
            catch (error) {
                const errorMessage = 'Error: User not found.';
                error = errorMessage;
                return response.status(404).json(error);
            }
        });
    }
}
exports.ListAllLinksOfUsersController = ListAllLinksOfUsersController;
//# sourceMappingURL=ListAllLinksOfUsersController.js.map