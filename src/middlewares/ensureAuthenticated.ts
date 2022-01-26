import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { UsersRepository } from "../repositories/UsersRepository";

interface IPayload {
  sub: string;
}

export async function ensureAuthenticated(request: Request, response: Response, next: NextFunction) {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new Error("Token missing");
  }

  const [, token] = authHeader.split(" ");

  try {
    const decoded = verify(token, process.env.JWT_SECRET);

    const { sub } = decoded as IPayload;

    const usersRepository = new UsersRepository();
    const user = usersRepository.findById(sub);

    if (!user) {
      throw new Error("User does not exists");
    }

    request.user = {
      id: sub,
    }

    next();
  } catch (error) {
    return response.status(400).json(error);
  }
}