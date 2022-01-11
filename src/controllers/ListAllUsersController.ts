import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListAllUsersServices } from "../services/ListAllUsersService";

export class ListAllUsersController {
  async handle(request: Request, response: Response) {
    const { id } = request.user;

    const listAllUsersService = container.resolve(ListAllUsersServices);

    const users = await listAllUsersService.execute(id);
    return response.json(users);
  }
}