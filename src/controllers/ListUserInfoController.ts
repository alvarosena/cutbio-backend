import { Request, Response } from 'express';
import { ListUserInfoService } from '../services/ListUserInfoService';
import { container } from 'tsyringe';

export class ListUserInfoController {
  async handle(request: Request, response: Response) {
    const { id } = request.user;
    const { username } = request.params;

    const listUserInfoService = container.resolve(ListUserInfoService);

    const user = await listUserInfoService.execute(id, username);
    return response.json(user);

  }
}