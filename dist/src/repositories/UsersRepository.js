"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersRepository = void 0;
const client_1 = require("@prisma/client");
class UsersRepository {
    constructor() {
        this.prisma = new client_1.PrismaClient();
    }
    async create(username, email, password) {
        const user = await this.prisma.user.create({
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
    }
    async findByUsername(username) {
        const user = await this.prisma.user.findUnique({
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
    }
    async findByEmail(email) {
        const user = await this.prisma.user.findUnique({
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
    }
    async findById(id) {
        const user = await this.prisma.user.findUnique({
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
    }
    async list() {
        const users = await this.prisma.user.findMany();
        return users;
    }
    async findAdmin() {
        const users = await this.prisma.user.findMany({
            where: {
                admin: true,
            }
        });
        return users;
    }
    async updateAvatar(username, avatar_url) {
        const user = await this.prisma.user.update({
            where: {
                username: String(username),
            },
            data: {
                avatar_url: avatar_url,
            }
        });
        return user;
    }
}
exports.UsersRepository = UsersRepository;
