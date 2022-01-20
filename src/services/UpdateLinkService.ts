import { ILinksRepository } from "../repositories/ILinksRepository";
import { inject, injectable } from "tsyringe";

@injectable()
export class UpdateLinkService {
  constructor(
    @inject("LinksRepository")
    private linksRepository: ILinksRepository
  ) { }

  async execute(id: string, name?: string, url?: string) {
    const link = await this.linksRepository.findById(id);

    if (!link) {
      throw new Error("Link not found.");
    }

    const updatedLink = await this.linksRepository.updateLink(id, name, url);
    return updatedLink;
  }
}