import { Link, PrismaClient } from "@prisma/client";
import { ILinksRepository } from "./ILinksRepository";


export class LinksRepository implements ILinksRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async create(name: string, url: string, user_id: string): Promise<Link> {
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

  async list(username: string): Promise<Link[]> {
    const links = await this.prisma.link.findMany({
      where: {
        user: {
          username: String(username)
        }
      }
    });
    return links;
  }

  async findById(id: string): Promise<Link> {
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

  async updateLink(id: string, name?: string, url?: string): Promise<Link> {
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

  async deleteLink(id: string): Promise<Link> {
    const link = await this.prisma.link.delete({
      where: {
        id: String(id),
      }
    });
    return link;
  }
}