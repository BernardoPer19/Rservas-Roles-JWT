import { Router } from "express";
import { UserController } from "../controller/UserController";
import { permitRoles } from "../middlewares/permisionRolesMiddleware";
import { verify } from "../middlewares/verifyTokenMiddleware";

export const publicRoutes = Router()

publicRoutes.get(
    "/profile",
    verify,
    permitRoles("usuario", "empleado", "admin"),
    UserController.profile
  );
  
  publicRoutes.get(
    "/reservas-public",
    verify,
    permitRoles("usuario", "empleado", "admin"),
    UserController.reservas
  );
 