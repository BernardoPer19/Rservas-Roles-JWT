import { Router } from "express";
import { verify } from "../middlewares/verifyTokenMiddleware";
import { permitRoles } from "../middlewares/permisionRolesMiddleware";
import { UserController } from "../controller/UserController";

const userRoutes = Router();

userRoutes.get(
  "/reservas",
  verify,
  permitRoles("usuario"),
  UserController.getReservations
);

userRoutes.post(
  "/reservas",
  verify,
  permitRoles("usuario"),
  UserController.createReservation
);

userRoutes.delete(
  "/reservas/:id",
  verify,
  permitRoles("usuario"),
  UserController.deleteReservation
);

export default userRoutes;
