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

  const jwtSecret = process.env.JWT_SECRET;

  try {
    const { sub: user_id } = verify(token, jwtSecret) as IPaylod;

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