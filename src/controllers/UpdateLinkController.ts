import { Request, Response } from 'express';
import { UpdateLinkService } from '../services/UpdateLinkService';
import { container } from 'tsyringe';

export class UpdateLinkController {
  async handle(request: Request, response: Response) {
    const { id } = request.params;
    const { name, url } = request.body;

    const updateLinkService = container.resolve(UpdateLinkService);

    const link = await updateLinkService.execute(id, name, url);
    return response.status(204).json(link);

  }
}