import { IUsersRepository } from "../repositories/IUsersRepository";
import { inject, injectable } from "tsyringe";
import { UserMap } from "../mapper/UserMap";


@injectable()
export class ListUserInfoService {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) { }

  async execute(id: string, username: string) {
    const user = await this.usersRepository.findByUsername(username);

    if (!user) {
      throw new Error("User not found.");
    }

    const userInfo = UserMap.toDTO(user);

    return userInfo;
  }
}