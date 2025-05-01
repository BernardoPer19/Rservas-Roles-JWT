import { Router } from "express";
import { AuthController } from "../controller/AuthController";
import { verify } from "../middlewares/verifyTokenMiddleware";

export const AuthRoutes = Router();

AuthRoutes.post("/register", AuthController.register);
AuthRoutes.post("/login", AuthController.login);
AuthRoutes.post("/", AuthController.logout);
AuthRoutes.get("/me", verify, AuthController.getCurrentUser);
