import { Request, Response } from "express";
import { UserTypes } from "../types/AuthTypes";

export class AdminController {
  static dashboard(req: Request, res: Response) {
    const user = req.user as UserTypes;
    res.status(200).json({
      message: "Panel de admin autorizado",
      user,
    });
  }
}
