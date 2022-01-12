
import { inject, injectable } from "tsyringe";
import { ILinksRepository } from "../repositories/ILinksRepository";
import { IUsersRepository } from "../repositories/IUsersRepository";

@injectable()
export class ListAllLinksOfUsersServices {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,

    @inject("LinksRepository")
    private linksRepository: ILinksRepository
  ) { }

  async execute(username: string) {
    const user = await this.usersRepository.findByUsername(username);

    if (!user) {
      throw new Error("User not found.");
    }

    const links = await this.linksRepository.list(username);
    return links;
  }
}