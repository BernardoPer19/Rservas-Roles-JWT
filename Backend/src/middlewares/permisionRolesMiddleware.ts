import { NextFunction, Request, Response } from "express";
import { UserTypes } from "../types/AuthTypes";

export const permitRoles = (...rolesPermitidos: string[]) => {
  return (
    req: Request & { user?: UserTypes },
    res: Response,
    next: NextFunction
  ) => {
    const userRol = req.user?.rol;
    if (!userRol || !rolesPermitidos.includes(userRol)) {
      res
        .status(403)
        .json({ message: "No tienes permisos para acceder a esta ruta" });
    }
    next();
  };
};
