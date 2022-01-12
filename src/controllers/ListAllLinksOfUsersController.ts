import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListAllLinksOfUsersServices } from '../services/ListAllLinksOfUsersService';

export class ListAllLinksOfUsersController {
  async handle(request: Request, response: Response) {
    try {
      const { username } = request.params;

      const listAlLinksOfUsersService = container.resolve(ListAllLinksOfUsersServices);

      const links = await listAlLinksOfUsersService.execute(username);
      return response.json(links);
    }
    catch (error) {
      const errorMessage = 'Error: User not found.';
      error = errorMessage;
      return response.status(404).json(error);
    }
  }
}