import { Router } from "express";
import { CreateUserContoller } from "../controllers/CreateUserContoller";
import { AuthenticateUserController } from '../controllers/AuthenticateUserController';
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { CreateLinkController } from "../controllers/CreateLinkController";
import { ListAllUsersController } from '../controllers/ListAllUsersController';

export const usersRoutes = Router();

const createUserController = new CreateUserContoller();
const authenticateUserController = new AuthenticateUserController();
const createLinkController = new CreateLinkController();
const listAllUsersController = new ListAllUsersController();

usersRoutes.post('/', createUserController.handle);
usersRoutes.post('/sessions/authenticate', authenticateUserController.handle);
usersRoutes.post('/links', ensureAuthenticated, createLinkController.handle);
usersRoutes.get('/', ensureAuthenticated, listAllUsersController.handle);