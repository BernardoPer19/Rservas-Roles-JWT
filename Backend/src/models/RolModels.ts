import { QueryResult } from "pg";
import pool from "../db/db";

export class RolModel {
  static async getRolIdByName(rolName: string) {
    try {
      const query = `SELECT rol_id FROM roles_tb WHERE nombre = $1`;
      const values = [rolName];

      const result: QueryResult<{ rol_id: number }> = await pool.query(
        query,
        values
      );
      if (result.rows.length === 0) {
        throw new Error("Rol no encontrado");
      }

      return result.rows[0].rol_id;
    } catch (error) {
      throw new Error("Error al obtener el rol_id");
    }
  }
}
