import { Request, Response } from "express";
import { container } from "tsyringe";
import { UpdateUserAvatarService } from "../services/UpdateUserAvatarService";


export class UpdateUserAvatarController {
  async handle(request: Request, response: Response) {
    const { username } = request.params;
    const file = request.file?.filename;

    const updateUserAvatarService = container.resolve(UpdateUserAvatarService);

    await updateUserAvatarService.execute(username, file);

    return response.status(204).json({ message: 'Uploaded succesfully!' });

  }
}