import { PrismaClient, User } from "@prisma/client";
import { IUsersRepository } from "./IUsersRepository";


export class UsersRepository implements IUsersRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async create(avatar_url: string, username: string, email: string, password: string): Promise<User> {
    const user = await this.prisma.user.create({
      data: {
        avatar_url: avatar_url,
        username: username,
        email: email,
        password: password,
        admin: false,
        pro: false,
      }
    });
    return user;
  }

  async findByUsername(username: string): Promise<User | null> {
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

  async findByEmail(email: string): Promise<User | null> {
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

}