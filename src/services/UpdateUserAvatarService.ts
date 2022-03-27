import { inject, injectable } from "tsyringe";
import { IUsersRepository } from "../repositories/IUsersRepository";
import { IStorageProvider } from "../shared/container/Providers/StorageProvider/IStorageProvider";

@injectable()
export class UpdateUserAvatarService {
  constructor(
    @inject("S3StorageProvider")
    private s3StorageProvider: IStorageProvider,

    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) { }

  async execute(file: string, user_id: string) {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new Error("User not found")
    }

    const newAvatar = await this.s3StorageProvider.save(file);

    const avatar_url = `${process.env.AWS_BUCKET_URL}/${newAvatar}`;

    const userUpdated = await this.usersRepository.updateAvatar(user.id, avatar_url);
    return userUpdated;
  }
}