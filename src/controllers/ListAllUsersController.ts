import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListAllUsersServices } from "../services/ListAllUsersService";

export class ListAllUsersController {
  async handle(request: Request, response: Response) {
    try {
      const listAllUsersService = container.resolve(ListAllUsersServices);

      const users = await listAllUsersService.execute();
      return response.json(users);
    }
    catch (error) {
      const errorMessage = "Error";
      error = errorMessage;
      return response.status(400).json(error);
    }
  }
}