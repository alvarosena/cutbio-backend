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
exports.CreateLinkController = void 0;
const tsyringe_1 = require("tsyringe");
const CreateLinkService_1 = require("../services/CreateLinkService");
class CreateLinkController {
    handle(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id: user_id } = request.user;
            const { name, url } = request.body;
            const createLinkService = tsyringe_1.container.resolve(CreateLinkService_1.CreateLinkService);
            const link = yield createLinkService.execute(name, url, user_id);
            return response.json(link);
        });
    }
}
exports.CreateLinkController = CreateLinkController;
//# sourceMappingURL=CreateLinkController.js.map