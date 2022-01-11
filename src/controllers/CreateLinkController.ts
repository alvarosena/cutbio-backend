import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateLinkService } from '../services/CreateLinkService';

export class CreateLinkController {
  async handle(request: Request, response: Response) {
    const { id: user_id } = request.user;
    const { name, url } = request.body;

    const createLinkService = container.resolve(CreateLinkService);

    const link = await createLinkService.execute(name, url, user_id);
    return response.json(link);
  }
}