import { Request, Response } from "express";
import { UserTypes } from "../types/AuthTypes";

export class UserController {
  static profile(req: Request, res: Response) {
    const user = req.user as UserTypes;
    res.status(200).json({
      message: "Perfil de usuario autorizado",
      user,
    });
  }

  static reservas(req: Request, res: Response) {
    const user = req.user as UserTypes;
    res.status(200).json({
      message: "Acceso a reservas autorizado",
      user,
    });
  }
}
