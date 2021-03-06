import { Link } from "@prisma/client";


export interface ILinksRepository {
  create(name: string, url: string, user_id: string): Promise<Link>;
  list(username: string): Promise<Link[]>;
  findById(id: string): Promise<Link>;
  updateLink(id: string, name?: string, url?: string): Promise<Link>;
  deleteLink(id: string): Promise<Link>;
}