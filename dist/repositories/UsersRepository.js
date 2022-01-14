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
exports.UsersRepository = void 0;
const client_1 = require("@prisma/client");
class UsersRepository {
    constructor() {
        this.prisma = new client_1.PrismaClient();
    }
    create(username, email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.prisma.user.create({
                data: {
                    avatar_url: '',
                    username: username,
                    email: email,
                    password: password,
                    admin: false,
                    pro: false,
                }
            });
            return user;
        });
    }
    findByUsername(username) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.prisma.user.findUnique({
                where: {
                    username: String(username),
                },
                select: {
                    id: true,
                    avatar_url: true,
                    username: true,
                    email: true,
                    password: true,
                    created_at: true,
                    admin: true,
                    pro: true,
                }
            });
            return user;
        });
    }
    findByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.prisma.user.findUnique({
                where: {
                    email: String(email),
                },
                select: {
                    id: true,
                    avatar_url: true,
                    username: true,
                    email: true,
                    password: true,
                    created_at: true,
                    admin: true,
                    pro: true,
                }
            });
            return user;
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.prisma.user.findUnique({
                where: {
                    id: String(id),
                },
                select: {
                    id: true,
                    avatar_url: true,
                    username: true,
                    email: true,
                    password: true,
                    created_at: true,
                    admin: true,
                    pro: true,
                }
            });
            return user;
        });
    }
    list() {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield this.prisma.user.findMany();
            return users;
        });
    }
    findAdmin() {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield this.prisma.user.findMany({
                where: {
                    admin: true,
                }
            });
            return users;
        });
    }
    updateAvatar(id, avatar_url) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.prisma.user.update({
                where: {
                    id: String(id),
                },
                data: {
                    avatar_url: avatar_url,
                }
            });
            return user;
        });
    }
}
exports.UsersRepository = UsersRepository;
//# sourceMappingURL=UsersRepository.js.map