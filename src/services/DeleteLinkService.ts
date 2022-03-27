import { inject, injectable } from "tsyringe";
import { ILinksRepository } from "../repositories/ILinksRepository";
import { IUsersRepository } from "../repositories/IUsersRepository";

@injectable()
export class DeleteLinkService {
  constructor(
    @inject("LinksRepository")
    private linksRepository: ILinksRepository,

    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) { }

  async execute(id: string, user_id: string) {
    const user = await this.usersRepository.findById(user_id)
    const link = await this.linksRepository.findById(id);

    if (!user) {
      throw new Error("User not found.")
    }

    if (!link) {
      throw new Error("Link not found.");
    }

    const deletedLink = await this.linksRepository.deleteLink(id);

    return deletedLink;
  }
}