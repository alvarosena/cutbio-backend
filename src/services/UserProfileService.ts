import { inject, injectable } from "tsyringe";
import { IUserResponseDTO, UserMap } from "../mapper/UserMap";
import { ILinksRepository } from "../repositories/ILinksRepository";
import { IUsersRepository } from "../repositories/IUsersRepository";

@injectable()
export class UserProfileService {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,

    @inject("LinksRepository")
    private linksRepository: ILinksRepository
  ) { }

  async execute(username: string) {
    const user = await this.usersRepository.findByUsername(username);
    const links = await this.linksRepository.list(username);


    if (!user) {
      throw new Error("User not found.");
    }

    const userInfo = UserMap.toDTO(user);

    const userResponse = [
      userInfo,
      links,
    ]

    return userResponse;
  }
}