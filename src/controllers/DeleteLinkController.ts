import { Request, Response } from 'express';
import { DeleteLinkService } from '../services/DeleteLinkService';
import { container } from 'tsyringe';

export class DeleteLinkController {
  async handle(request: Request, response: Response) {
    const { id: user_id } = request.user;
    const { id } = request.params;

    const deleteLinkService = container.resolve(DeleteLinkService);

    await deleteLinkService.execute(id, user_id);
    return response.status(204).send();

  }
}