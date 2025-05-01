import { Request, Response } from "express";
import { UserTypes } from "../types/AuthTypes";

export class RouteController {
  static utilRoutes(req: Request, res: Response, routeName: string) {
    const user = req.user as UserTypes;

    if (!user) {
      return res
        .status(404)
        .json("No estás autorizado para entrar a esta ruta");
    }

    res
      .status(200)
      .json({ message: `Usuario autorizado, ingreso a ${routeName}`, user });
    return;
  }

  static usersRoute(req: Request, res: Response) {
    this.utilRoutes(req, res, "User Page");
  }

  static usersReservas(req: Request, res: Response) {
    this.utilRoutes(req, res, "Reservas Page");
  }

  static Admin(req: Request, res: Response) {
    this.utilRoutes(req, res, "Admin Page");
  }
}
