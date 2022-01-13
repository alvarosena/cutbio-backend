import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";
import { IUsersRepository } from "../repositories/IUsersRepository";

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: {
    username: string;
    email: string;
  },
  token: string;
}

@injectable()
export class AuthenticateUserService {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) { }

  async execute({ email, password }: IRequest) {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new Error("Email or password is incorrect");
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new Error("Password is incorrect!");
    }

    const jwtSecret = process.env.JWT_SECRET;

    const token = sign({}, jwtSecret, {
      subject: user.id,
    })

    const tokenReturn: IResponse = {
      token,
      user: {
        username: user.username,
        email: user.email,
      }
    }

    return tokenReturn;
  }
}
