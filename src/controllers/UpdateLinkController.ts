import { Request, Response } from 'express';
import { UpdateLinkService } from '../services/UpdateLinkService';
import { container } from 'tsyringe';

export class UpdateLinkController {
  async handle(request: Request, response: Response) {
    try {
      const { id } = request.params;
      const { name, url } = request.body;

      const updateLinkService = container.resolve(UpdateLinkService);

      const link = await updateLinkService.execute(id, name, url);
      return response.status(204).json(link);
    }
    catch (error) {
      const errorMessage = 'Error: Link not found.';
      error = errorMessage;
      return response.status(404).json(error);
    }
  }
}