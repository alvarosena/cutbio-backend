import { ILinksRepository } from "../repositories/ILinksRepository";
import { inject, injectable } from "tsyringe";
import { IUsersRepository } from "repositories/IUsersRepository";

@injectable()
export class UpdateLinkService {
  constructor(
    @inject("LinksRepository")
    private linksRepository: ILinksRepository,

    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) { }

  async execute(user_id: string, id: string, name?: string, url?: string) {
    const user = await this.usersRepository.findById(user_id)
    const link = await this.linksRepository.findById(id);

    if (!user) {
      throw new Error("User not found.")
    }

    if (!link) {
      throw new Error("Link not found.");
    }

    const updatedLink = await this.linksRepository.updateLink(id, name, url);
    return updatedLink;
  }
}