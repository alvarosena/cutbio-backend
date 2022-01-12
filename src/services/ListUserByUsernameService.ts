import { inject, injectable } from "tsyringe";
import { IUsersRepository } from "../repositories/IUsersRepository";

@injectable()
export class ListUserByUsernameService {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) { }

  async execute(username: string) {
    const user = await this.usersRepository.findByUsername(username);

    if (!user) {
      throw new Error("User not found.");
    }

    return user;
  }
}