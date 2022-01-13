import { container } from "tsyringe";
import { ILinksRepository } from "../../repositories/ILinksRepository";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { LinksRepository } from "../../repositories/LinksRepository";
import { UsersRepository } from '../../repositories/UsersRepository';
import { IStorageProvider } from "./Providers/StorageProvider/IStorageProvider";
import { S3StorageProvider } from "./Providers/StorageProvider/S3StorageProvider";


container.registerSingleton<IUsersRepository>(
  "UsersRepository",
  UsersRepository
)

container.registerSingleton<ILinksRepository>(
  "LinksRepository",
  LinksRepository
)

container.registerSingleton<IStorageProvider>(
  "S3StorageProvider",
  S3StorageProvider
)
