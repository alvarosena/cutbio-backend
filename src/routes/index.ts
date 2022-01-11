import { Router } from "express";
import { usersRoutes } from "./user.routes";


export const routes = Router();

routes.use('/api/users', usersRoutes);