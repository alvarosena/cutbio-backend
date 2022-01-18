import { NextFunction, Response, Request } from "express";
import { verify } from "jsonwebtoken";
import { UsersRepository } from '../repositories/UsersRepository';

interface IPayload {
  sub: string;
}

export async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction) {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new Error("Token is missing");
  }

  const [, token] = authHeader.split(" ");

  try {
    const { sub: user_id } = verify(token, process.env.JWT_SECRET) as IPayload;

    const usersRespository = new UsersRepository();

    const user = usersRespository.findById(user_id);

    if (!user) {
      throw new Error("User does not exists");
    }

    request.user = {
      id: user_id,
    }

    next();
  } catch {
    throw new Error("Invalid token");
  }

}