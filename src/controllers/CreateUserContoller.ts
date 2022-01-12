import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateUserService } from "../services/CreateUserService";


export class CreateUserContoller {
  async handle(request: Request, response: Response) {
    try {
      const { avatar_url, username, email, password } = request.body;

      const createUserService = container.resolve(CreateUserService);

      const user = await createUserService.execute(avatar_url, username, email, password);
      return response.json(user);
    }
    catch (error) {
      const errorMessage = 'Error: Username already taken.';
      error = errorMessage;
      return response.status(400).json(error);
    }
  }
}