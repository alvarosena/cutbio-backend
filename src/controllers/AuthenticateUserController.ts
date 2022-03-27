import { Request, Response } from "express";
import { container } from "tsyringe";
import { AuthenticateUserService } from "../services/AuthenticateUserService";


export class AuthenticateUserController {
  async handle(request: Request, response: Response) {
    const { email, password } = request.body;

    const authenticateUserService = container.resolve(AuthenticateUserService);

    const token = await authenticateUserService.execute({ email, password });
    return response.json(token)
  }
}