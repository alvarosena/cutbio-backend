"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LinksRepository = void 0;
const client_1 = require("@prisma/client");
class LinksRepository {
    constructor() {
        this.prisma = new client_1.PrismaClient();
    }
    async create(name, url, user_id) {
        const link = await this.prisma.link.create({
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
    }
    async list(username) {
        const links = await this.prisma.link.findMany({
            where: {
                user: {
                    username: String(username)
                }
            }
        });
        return links;
    }
}
exports.LinksRepository = LinksRepository;
