import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListAllUsersServices } from "../services/ListAllUsersService";

export class ListAllUsersController {
  async handle(request: Request, response: Response) {
    try {
      const { username } = request.params;

      const listAllUsersService = container.resolve(ListAllUsersServices);

      const users = await listAllUsersService.execute(username);
      return response.json(users);
    }
    catch (error) {
      const errorMessage = "Error: You don't is an admin.";
      error = errorMessage;
      return response.status(400).json(error);
    }
  }
}