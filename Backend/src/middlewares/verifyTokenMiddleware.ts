import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { JWT_PASSWORD } from "../config";
import { UserTypes } from "../types/AuthTypes";

export const verify = (
  req: Request & { user?: UserTypes },
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.cookies.access_token;
    if (!token) {
      return res.status(404).json("El token es invalido o fue expitado!");
    }
    const decoded = jwt.verify(token, JWT_PASSWORD) as UserTypes;
    req.user = decoded;
    next();
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error al verificar el token:", error.message);
      return res.status(403).json({ message: "Token inválido o expirado" });
    }
  }
};
