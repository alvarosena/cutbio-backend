import { Request, Response } from "express";
import { container } from "tsyringe";
import { UserProfileService } from "../services/UserProfileService";


export class UserProfileController {
  async handle(request: Request, response: Response) {
    const { username } = request.params;

    const userProfileService = container.resolve(UserProfileService);

    const user = await userProfileService.execute(username);
    return response.json(user);

  }
}