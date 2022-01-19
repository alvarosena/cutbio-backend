import { Request, Response } from "express";
import { container } from "tsyringe";
import { UsersRepository } from "../repositories/UsersRepository";
import { UpdateUserAvatarService } from "../services/UpdateUserAvatarService";


export class UpdateUserAvatarController {
  async handle(request: Request, response: Response) {
    try {
      const { username } = request.params;
      const file = request.file?.filename;

      const updateUserAvatarService = container.resolve(UpdateUserAvatarService);

      await updateUserAvatarService.execute(username, file);

      return response.status(204).send();
    }
    catch (error) {
      const errorMessage = 'Error: User not found.';
      error = errorMessage;
      return response.json(error);
    }
  }
}