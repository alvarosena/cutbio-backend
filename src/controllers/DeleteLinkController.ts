import { Request, Response } from 'express';
import { DeleteLinkService } from '../services/DeleteLinkService';
import { container } from 'tsyringe';

export class DeleteLinkController {
  async handle(request: Request, response: Response) {
    try {
      const { id } = request.params;

      const deleteLinkService = container.resolve(DeleteLinkService);

      await deleteLinkService.execute(id);
      return response.status(204).send();
    }
    catch (error) {
      const errorMessage = 'Error: Link not found.';
      error = errorMessage;
      return response.status(404).json(error);
    }
  }
}