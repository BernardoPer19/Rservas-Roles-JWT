import { Router } from "express";
import { verify } from "../middlewares/verifyTokenMiddleware";
import { permitRoles } from "../middlewares/permisionRolesMiddleware";
import { AdminController } from "../controller/AdminController";

const adminRoutes = Router();

adminRoutes.get(
  "/reservas",
  verify,
  permitRoles("admin", "empleado"),
  AdminController.getAllReservations
);

adminRoutes.post(
  "/reservas",
  verify,
  permitRoles("admin"),
  AdminController.createReservation
);

adminRoutes.delete(
  "/reservas/:id",
  verify,
  permitRoles("admin"),
  AdminController.deleteReservation
);

export default adminRoutes;
