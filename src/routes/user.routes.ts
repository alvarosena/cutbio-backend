import { Router } from "express";
import { CreateUserContoller } from "../controllers/CreateUserContoller";
import { AuthenticateUserController } from '../controllers/AuthenticateUserController';
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { CreateLinkController } from "../controllers/CreateLinkController";
import { ListAllUsersController } from '../controllers/ListAllUsersController';
import { ListAllLinksOfUsersController } from "../controllers/ListAllLinksOfUsersController";
import { UserProfileController } from "../controllers/UserProfileController";
import { UpdateAvatarController } from "../controllers/UpdateAvatarController";
import multer from "multer";
import uploadConfig from "../config/upload";

export const usersRoutes = Router();
const uploadAvatar = multer(uploadConfig);

const createUserController = new CreateUserContoller();
const authenticateUserController = new AuthenticateUserController();
const createLinkController = new CreateLinkController();
const listAllUsersController = new ListAllUsersController();
const listAlLinksOfUsersController = new ListAllLinksOfUsersController();
const userProfileController = new UserProfileController();
const updateAvatarController = new UpdateAvatarController();

usersRoutes.post('/', createUserController.handle);
usersRoutes.post('/sessions/authenticate', authenticateUserController.handle);
usersRoutes.get('/', ensureAuthenticated, listAllUsersController.handle);
usersRoutes.get('/:username', userProfileController.handle);
usersRoutes.post('/links', ensureAuthenticated, createLinkController.handle);
usersRoutes.get('/links/:username', listAlLinksOfUsersController.handle);
usersRoutes.patch('/profile/avatar', uploadAvatar.single('avatar'), ensureAuthenticated, updateAvatarController.handle)