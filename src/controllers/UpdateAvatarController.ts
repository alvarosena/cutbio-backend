import { Request, Response } from "express";
import { container } from "tsyringe";
import { UpdateUserAvatarService } from "../services/UpdateUserAvatarService";


export class UpdateUserAvatarController {
  async handle(request: Request, response: Response) {
    const { id: user_id } = request.user;
    const file = request.file?.filename;

    const updateUserAvatarService = container.resolve(UpdateUserAvatarService);

    await updateUserAvatarService.execute(user_id, file);

    return response.status(204).json({ message: 'Uploaded succesfully!' });

  }
}