import bcrypt from "bcryptjs";
import jwt, { JwtPayload } from "jsonwebtoken";
import { UserTypes } from "../types/AuthTypes";
import { JWT_PASSWORD } from "../config";

const comparePasswords = async (
  plainPassword: string,
  hashPassword: string
): Promise<boolean> => {
  const comparePassword = await bcrypt.compare(plainPassword, hashPassword);
  return comparePassword;
};

const hashPassword = async (password: string): Promise<string> => {
  try {
    return await bcrypt.hash(password, 10);
  } catch (error: any) {
    throw new Error(`Error hashing password: ${error.message}`);
  }
};

const createToken = (user: UserTypes): string => {
  try {
    const token = jwt.sign(
      {
        id: user.Usuario_id,
        name: user.nombre,
        email: user.email,
        rol: user.rol,
        password: user.password,
      },
      JWT_PASSWORD,
      {
        expiresIn: "24h",
      }
    );

    return token;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error generating token: ${error.message}`);
    }
    throw new Error(`Error desconocido al crear el token`);
  }
};

const verifyToken = (token: string): string | JwtPayload => {
  try {
    return jwt.verify(token, JWT_PASSWORD);
  } catch (error: any) {
    throw new Error(`Error verifying token: ${error.message}`);
  }
};

export { hashPassword, comparePasswords, createToken, verifyToken };
