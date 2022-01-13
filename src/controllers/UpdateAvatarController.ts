import { Request, Response } from "express";
import { container } from "tsyringe";
import { UsersRepository } from "../repositories/UsersRepository";
import { UpdateAvatarService } from "../services/UpdateAvatarService";


export class UpdateAvatarController {
  async handle(request: Request, response: Response) {
    try {
      const file = request.file?.filename;
      const { id } = request.user;

      const updateAvatarService = container.resolve(UpdateAvatarService);
      const usersRepository = new UsersRepository();

      const result = await updateAvatarService.execute(id, file);

      const avatar_url = `${process.env.AWS_BUCKET_URL}/${result}`;

      const userResponse = usersRepository.updateAvatar(id, avatar_url);
      return response.status(204).json(userResponse);
    }
    catch (error) {
      const errorMessage = 'Error: User not found.';
      error = errorMessage;
      return response.status(404).json(error);
    }
  }
}