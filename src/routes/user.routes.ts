import { Router } from "express";
import { CreateUserContoller } from "../controllers/CreateUserContoller";
import { AuthenticateUserController } from '../controllers/AuthenticateUserController';
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { CreateLinkController } from "../controllers/CreateLinkController";
import { ListAllUsersController } from '../controllers/ListAllUsersController';
import { ListAllLinksOfUsersController } from "../controllers/ListAllLinksOfUsersController";
import { UserProfileController } from "../controllers/UserProfileController";
import { UpdateUserAvatarController } from "../controllers/UpdateAvatarController";
import multer from "multer";
import uploadConfig from "../config/upload";
import { UpdateLinkController } from "../controllers/UpdateLinkController";
import { DeleteLinkController } from "../controllers/DeleteLinkController";
import { ListUserInfoController } from "../controllers/ListUserInfoController";

export const usersRoutes = Router();
const uploadAvatar = multer(uploadConfig);

const createUserController = new CreateUserContoller();
const authenticateUserController = new AuthenticateUserController();
const createLinkController = new CreateLinkController();
const listAllUsersController = new ListAllUsersController();
const listAlLinksOfUsersController = new ListAllLinksOfUsersController();
const userProfileController = new UserProfileController();
const updateUserAvatarController = new UpdateUserAvatarController();
const updateLinkController = new UpdateLinkController();
const deleteLinkController = new DeleteLinkController();
const listUserInfoController = new ListUserInfoController();

usersRoutes.post('/', createUserController.handle);
usersRoutes.post('/sessions/auth', authenticateUserController.handle);
usersRoutes.get('/profile/:username', ensureAuthenticated, listUserInfoController.handle);
usersRoutes.get('/', listAllUsersController.handle);
usersRoutes.get('/:username', userProfileController.handle);
usersRoutes.post('/links', ensureAuthenticated, createLinkController.handle);
usersRoutes.get('/:username/links', listAlLinksOfUsersController.handle);
usersRoutes.put('/:username/avatar', uploadAvatar.single('avatar'), ensureAuthenticated, updateUserAvatarController.handle);
usersRoutes.patch('/links/:id', ensureAuthenticated, updateLinkController.handle);
usersRoutes.delete('/links/:id', ensureAuthenticated, deleteLinkController.handle);