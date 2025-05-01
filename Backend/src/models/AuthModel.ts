import { UserTypes } from "../types/AuthTypes";
import { MixedUserType } from "../schemas/AuthValidate"; // 👈 importamos el tipo correcto
import { QueryResult } from "pg";
import { RolModel } from "./RolModels";
import pool from "../db/db";
import { hashPassword } from "../utils/UtilsAuth";

export class AuthModel {
  static async register(
    newUser: MixedUserType,
    isAdmin: boolean
  ): Promise<UserTypes> {
    try {
      const rolName = isAdmin ? newUser.rol! : "usuario";
      const rolId = await RolModel.getRolIdByName(rolName);

      const query = `
        INSERT INTO usuarios_tb(nombre, email, password, rol_id)
        VALUES ($1, $2, $3, $4)
        RETURNING *;
      `;
      const hashedPassword = await hashPassword(newUser.password);
      const values = [newUser.nombre, newUser.email, hashedPassword, rolId];

      const result: QueryResult<UserTypes> = await pool.query(query, values);
      return result.rows[0];
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error("Error en la DB");
    }
  }

  static async getEmail(email: string): Promise<UserTypes | undefined> {
    try {
      const query = `
        SELECT 
          u.nombre, 
          u.email, 
          u.password, 
          r.nombre AS rol
        FROM usuarios_tb u
        JOIN roles_tb r ON u.rol_id = r.rol_id
        WHERE u.email = $1
      `;
      const values = [email];
      const result: QueryResult<UserTypes> = await pool.query(query, values);
      return result.rows[0];
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error("Error en la DB");
    }
  }
}
