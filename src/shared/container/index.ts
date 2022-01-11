import { container } from "tsyringe";
import { ILinksRepository } from "../../repositories/ILinksRepository";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { LinksRepository } from "../../repositories/LinksRepository";
import { UsersRepository } from '../../repositories/UsersRepository';


container.registerSingleton<IUsersRepository>(
  "UsersRepository",
  UsersRepository
)

container.registerSingleton<ILinksRepository>(
  "LinksRepository",
  LinksRepository
)
