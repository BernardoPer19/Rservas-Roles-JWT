import { Router } from "express";
import { verify } from "../middlewares/verifyTokenMiddleware";
import { permitRoles } from "../middlewares/permisionRolesMiddleware";
import { AdminController } from "../controller/AdminController";
import { UserController } from "../controller/UserController";

const AdminRoute = Router();

AdminRoute.get(
  "/dashboard",
  verify,
  permitRoles("admin"),
  AdminController.dashboard
);

AdminRoute.get(
  "/register-admin",
  verify,
  permitRoles("admin"),
  AdminController.dashboard
);

AdminRoute.get(
  "/reservas-private",
  verify,
  permitRoles("empleado", "admin"),
  UserController.reservas
);

export default AdminRoute;
