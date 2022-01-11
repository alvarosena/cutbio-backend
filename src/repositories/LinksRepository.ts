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


}