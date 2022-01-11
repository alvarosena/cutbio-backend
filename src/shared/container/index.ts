import { container } from "tsyringe";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { UsersRepository } from '../../repositories/UsersRepository';


container.registerSingleton<IUsersRepository>(
  "UsersRepository",
  UsersRepository
)