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
    async findById(id) {
        const link = await this.prisma.link.findUnique({
            where: {
                id: String(id),
            },
            select: {
                id: true,
                name: true,
                url: true,
                created_at: true,
                user_id: true,
            }
        });
        return link;
    }
    async updateLink(id, name, url) {
        const link = await this.prisma.link.update({
            where: {
                id: String(id),
            },
            data: {
                name: String(name),
                url: String(url),
            }
        });
        return link;
    }
    async deleteLink(id) {
        const link = await this.prisma.link.delete({
            where: {
                id: String(id),
            }
        });
        return link;
    }
}
exports.LinksRepository = LinksRepository;
