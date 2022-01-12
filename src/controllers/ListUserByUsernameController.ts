import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListUserByUsernameService } from "../services/ListUserByUsernameService";


export class ListUserByUsernameController {
  async handle(request: Request, response: Response) {
    try {
      const { username } = request.params;

      const listUserByUsernameService = container.resolve(ListUserByUsernameService);

      const user = await listUserByUsernameService.execute(username);
      return response.json(user);
    }
    catch (error) {
      const errorMessage = 'Error: User not found.';
      error = errorMessage;
      return response.status(404).json(error);
    }
  }
}