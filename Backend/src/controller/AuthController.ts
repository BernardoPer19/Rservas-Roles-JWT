import { Request, Response } from "express"; 
import { AuthModel } from "../models/AuthModel";
import { validateRegister } from "../schemas/AuthValidate";
import { MixedUserType } from "../schemas/AuthValidate";

export class AuthController {
  static async register(req: Request, res: Response): Promise<void> {
    try {
      const input: MixedUserType = validateRegister(req.body);

      const isAdmin = !!input.rol;
      const newUser = await AuthModel.register(input, isAdmin);

      res.status(201).json({
        message: "Usuario registrado exitosamente",
        data: newUser,
      });
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
      }
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
}
