import { Router } from "express";
import { CreateUserContoller } from "../controllers/CreateUserContoller";
import { AuthenticateUserController } from '../controllers/AuthenticateUserController';

export const usersRoutes = Router();

const createUserController = new CreateUserContoller();
const authenticateUserController = new AuthenticateUserController();

usersRoutes.post('/', createUserController.handle);
usersRoutes.post('/sessions/authenticate', authenticateUserController.handle);