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

    if (!user) {
      throw new Error("User not found");
    }

    const result = await this.s3StorageProvider.save(file);
    return result;
  }
}