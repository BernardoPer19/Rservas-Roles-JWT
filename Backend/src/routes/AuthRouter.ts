import { Router } from "express";
import { AuthController } from "../controller/AuthController";

export const AuthRoutes = Router();

AuthRoutes.post("/register", AuthController.register);
