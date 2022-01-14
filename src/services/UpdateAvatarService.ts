import { inject, injectable } from "tsyringe";
import { IUsersRepository } from "../repositories/IUsersRepository";
import { IStorageProvider } from "../shared/container/Providers/StorageProvider/IStorageProvider";

@injectable()
export class UpdateAvatarService {
  constructor(
    @inject("S3StorageProvider")
    private s3StorageProvider: IStorageProvider,

    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) { }

  async execute(id: string, file: string) {
    const user = await this.usersRepository.findById(id);

    if (user?.avatar_url) {
      await this.s3StorageProvider.delete(user.avatar_url);
    }

    const newAvatar = await this.s3StorageProvider.save(file);

    const avatar_url = `${process.env.AWS_BUCKET_URL}/${newAvatar}`;

    const userUpdated = await this.usersRepository.updateAvatar(id, avatar_url);

    return userUpdated;
  }
}