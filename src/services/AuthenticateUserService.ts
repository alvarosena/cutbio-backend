import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";
import { IUsersRepository } from '../repositories/IUsersRepository';

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: {
    avatar_url: string;
    username: string;
    email: string;
  },
  token: string;
}

@injectable()
class AuthenticateUserService {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) { }

  async execute({ email, password }: IRequest) {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new Error("User not found");
    }

    const passwordMatch = compare(password, user.password);

    if (!passwordMatch) {
      throw new Error("Password not exists");
    }

    const token = sign({}, process.env.JWT_SECRET, {
      subject: user.id,
    })

    const tokenReturn: IResponse = {
      token,
      user: {
        avatar_url: user.avatar_url,
        username: user.username,
        email: user.email,
      }
    }

    return tokenReturn;

  }
}

export { AuthenticateUserService }