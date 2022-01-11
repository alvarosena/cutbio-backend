import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { UsersRepository } from "../repositories/UsersRepository";

interface IPaylod {
  sub: string;
}

export function ensureAuthenticated(request: Request, response: Response, next: NextFunction) {
  const authToken = request.headers.authorization;

  if (!authToken) {
    throw new Error("Token is missing.");
  }

  const [, token] = authToken.split(" ");

  try {
    const { sub: user_id } = verify(token, "7d4733a55f330d7e8cafe699426e6ad5") as IPaylod;

    const usersRepository = new UsersRepository();

    const user = usersRepository.findById(user_id);

    if (!user) {
      throw new Error("User not found.");
    }

    request.user = {
      id: user_id
    }

    next();
  }
  catch (error) {
    return response.json(error);
  }
}