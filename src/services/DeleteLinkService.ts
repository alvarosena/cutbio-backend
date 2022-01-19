import { ILinksRepository } from "../repositories/ILinksRepository";
import { inject, injectable } from "tsyringe";

@injectable()
export class DeleteLinkService {
  constructor(
    @inject("LinksRepository")
    private linksRepository: ILinksRepository
  ) { }

  async execute(id: string) {
    const link = await this.linksRepository.findById(id);

    if (!link) {
      throw new Error("Link not found.");
    }

    const deletedLink = await this.linksRepository.deleteLink(id);

    return deletedLink;
  }
}