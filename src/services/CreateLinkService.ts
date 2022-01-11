import { inject, injectable } from "tsyringe";
import { ILinksRepository } from "../repositories/ILinksRepository";

@injectable()
export class CreateLinkService {
  constructor(
    @inject("LinksRepository")
    private linksRepository: ILinksRepository
  ) { }

  async execute(name: string, url: string, user_id: string) {
    const link = this.linksRepository.create(name, url, user_id);
    return link;
  }
}