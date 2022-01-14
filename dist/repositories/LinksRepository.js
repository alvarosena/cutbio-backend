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
exports.LinksRepository = void 0;
const client_1 = require("@prisma/client");
class LinksRepository {
    constructor() {
        this.prisma = new client_1.PrismaClient();
    }
    create(name, url, user_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const link = yield this.prisma.link.create({
                data: {
                    name: name,
                    url: url,
                    user_id
                },
                include: {
                    user: true
                }
            });
            return link;
        });
    }
    list(username) {
        return __awaiter(this, void 0, void 0, function* () {
            const links = yield this.prisma.link.findMany({
                where: {
                    user: {
                        username: String(username)
                    }
                }
            });
            return links;
        });
    }
}
exports.LinksRepository = LinksRepository;
//# sourceMappingURL=LinksRepository.js.map