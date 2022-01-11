import { compare } from "bcrypt";
import { inject, injectable } from "tsyringe";
import { IUsersRepository } from "../repositories/IUsersRepository";

@injectable()
export class ListAllUsersServices {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) { }

  async execute(id: string) {
    const user = await this.usersRepository.findById(id)

    if (user?.admin !== true) {
      throw new Error("You don't is an admin.");
    }

    const users = await this.usersRepository.list();
    return users;
  }
}