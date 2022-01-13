import { hash } from "bcrypt";
import { inject, injectable } from "tsyringe";
import { IUsersRepository } from "../repositories/IUsersRepository";


@injectable()
export class CreateUserService {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) { }

  async execute(username: string, email: string, password: string) {
    const userAlreadyExists = await this.usersRepository.findByUsername(username);

    if (userAlreadyExists) {
      throw new Error("Username already taken.");
    }

    if (!email || !password) {
      throw new Error("Email or password is incorrect.");

    }

    const hashPassword = await hash(password, 10);

    const user = await this.usersRepository.create(username, email, hashPassword);
    return user;
  }
}

