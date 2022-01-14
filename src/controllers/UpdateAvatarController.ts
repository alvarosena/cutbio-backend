import { Request, Response } from "express";
import { container } from "tsyringe";
import { UsersRepository } from "../repositories/UsersRepository";
import { UpdateAvatarService } from "../services/UpdateAvatarService";


export class UpdateAvatarController {
  async handle(request: Request, response: Response) {
    try {
      const { id } = request.user;
      const file = request.file?.filename;

      const updateAvatarService = container.resolve(UpdateAvatarService);

      await updateAvatarService.execute(id, file);

      return response.status(204).send();
    }
    catch (error) {
      const errorMessage = 'Error: User not found.';
      error = errorMessage;
      return response.status(404).json(error);
    }
  }
}