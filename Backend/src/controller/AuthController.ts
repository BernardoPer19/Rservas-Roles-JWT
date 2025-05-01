import { CookieOptions, Request, Response } from "express";
import { AuthModel } from "../models/AuthModel";
import { validateLogin, validateRegister } from "../schemas/AuthValidate";
import { MixedUserType } from "../schemas/AuthValidate";
import { comparePasswords, createToken } from "../utils/UtilsAuth";
import { UserTypes } from "../types/AuthTypes";

export class AuthController {
  static async register(req: Request, res: Response): Promise<void> {
    try {
      const validateData: MixedUserType = validateRegister(req.body);
      const isAdmin = !!validateData.rol;

      const foudEmail = await AuthModel.getEmail(validateData.email);
      if (foudEmail) {
        res.status(400).json({ message: "El email YA está registrado" });
        return;
      }

      const newUser = await AuthModel.register(validateData, isAdmin);

      res.status(201).json({
        message: "Usuario registrado exitosamente",
        data: newUser,
      });
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message });
        return;
      }
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  static async login(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = validateLogin(req.body);

      const user = await AuthModel.getEmail(email);
      if (!user) {
        res.status(404).json({ message: "El email no está registrado" });
        return;
      }

      const isPasswordValid = await comparePasswords(password, user.password);
      if (!isPasswordValid) {
        res.status(401).json({ message: "La contraseña es incorrecta" });
        return;
      }

      const token = createToken({
        Usuario_id: user.Usuario_id,
        nombre: user.nombre,
        email: user.email,
        rol: user.rol,
        password: user.password,
      });

      const options: CookieOptions = {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
        maxAge: 24 * 60 * 60 * 1000,
      };

      res
        .status(200)
        .cookie("access_token", token, options)
        .json({
          message: "Login exitoso",
          user: {
            id: user.Usuario_id,
            email: user.email,
            nombre: user.nombre,
            rol: user.rol,
          },
        });
    } catch (error) {
      const err = error as Error;
      res.status(500).json({
        message: "Error al intentar iniciar sesión",
        error: err.message,
      });
    }
  }

  static logout(_req: Request, res: Response) {
    res.clearCookie("access_token", {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    });

    res.status(200).json({ message: "Logged out successfully" });
  }

  static protectedRoute(req: Request, res: Response) {
    const user = req.user as UserTypes;

    if (!user) {
      res.status(401).json({ message: "Usuario no autorizado" });
      return;
    }

    res.status(200).json({ message: "Usuario autorizado", user });
    return;
  }
}
