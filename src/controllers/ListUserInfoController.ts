import { Request, Response } from 'express';
import { ListUserInfoService } from '../services/ListUserInfoService';
import { container } from 'tsyringe';

export class ListUserInfoController {
  async handle(request: Request, response: Response) {
    try {
      const { username } = request.params;

      const listUserInfoService = container.resolve(ListUserInfoService);

      const user = await listUserInfoService.execute(username);
      return response.json(user);
    }
    catch (err) {
      return response.status(404).json(err);
    }
  }
}