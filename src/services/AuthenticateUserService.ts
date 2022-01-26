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
    avatar_url: string,
    username: string,
    email: string,
  },
  token: string;
}
@injectable()
export class AuthenticateUserService {
  constructor(
    @inject("UsersRepository")
    private usersRespository: IUsersRepository
  ) { }

  async execute({ password, email }: IRequest) {
    const user = await this.usersRespository.findByEmail(email);

    if (!user) {
      throw new Error("User not found.");
    }

    const passwordMatch = compare(password, user.password);

    if (!passwordMatch) {
      throw new Error("Email or password is incorrect!")
    }

    const token = sign({}, process.env.JWT_SECRET, {
      subject: user.id,
      expiresIn: process.env.EXPIRES_IN,
    });

    const tokenReturn: IResponse = {
      token,
      user: {
        avatar_url: user.avatar_url,
        username: user.username,
        email: user.email,
      }
    };

    return tokenReturn;
  }
}
