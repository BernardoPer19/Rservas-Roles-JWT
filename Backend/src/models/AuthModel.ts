import pool from "../db/db";
import { UserTypes } from "../types/AuthTypes";
import { QueryResult } from "pg";

export class AuthModel {
  static async registerUsers(newUser: UserTypes) {
    try {
      const query = `INSERT INTO usuarios_tb(
        nombre, email, password, reserva_id, rol_id)
       VALUES (1$, 2$, 3$, 4$, 5$);`;
      const values = [newUser.nombre, newUser.email, newUser.password];

      const result: QueryResult<UserTypes> = await pool.query(query, values);
      return result.rows;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error("Error al crear un nuevo usuario!");
      }
      throw new Error("Error en la DB");
    }
  }

  static async getEmail(email: string) {
    try {
      const query = `SELECT * FROM usuarios_tb WHERE email = $1`;
      const values = [email];
      const result: QueryResult<UserTypes> = await pool.query(query, values);
      return result.rows;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error("Error al crear un nuevo usuario!");
      }
      throw new Error("Error en la DB");
    }
  }
}
