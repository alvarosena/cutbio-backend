import { inject, injectable } from "tsyringe";
import { IUserResponseDTO, UserMap } from "../mapper/UserMap";
import { IUsersRepository } from "../repositories/IUsersRepository";

@injectable()
export class UserProfileService {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) { }

  async execute(username: string): Promise<IUserResponseDTO> {
    const user = await this.usersRepository.findByUsername(username);

    if (!user) {
      throw new Error("User not found.");
    }

    return UserMap.toDTO(user);
  }
}