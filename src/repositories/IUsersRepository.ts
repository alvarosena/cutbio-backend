import { User } from "@prisma/client";

export interface IUsersRepository {
  create(avatar_url: string, username: string, email: string, password: string): Promise<User>
  findByUsername(username: string): Promise<User | null>
  findByEmail(email: string): Promise<User | null>
  findById(id: string): Promise<User | null>
  list(): Promise<User[] | null>
  findAdmin(): Promise<User[] | null>
}