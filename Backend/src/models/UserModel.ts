import pool from "../db/db";
import { ReservasDB } from "../types/ReservasTypes";

export class UsuarioReservasModel {
  static async getReservationsByUsuario(
    usuarioId: number
  ): Promise<ReservasDB[]> {
    try {
      const query = `
        SELECT 
          reserva_id,
          problema_id AS problemas_id,
          usuario_id,
          "descripción" AS descripcion,
          encabezado
        FROM reservas_tb
        WHERE usuario_id = $1;
      `;
      const result = await pool.query(query, [usuarioId]);
      return result.rows;
    } catch (error) {
      console.error("Error fetching reservations by user:", error);
      throw error;
    }
  }

  static async createReservation(
    reserva: Omit<ReservasDB, "reserva_id">
  ): Promise<void> {
    try {
      const query = `
        INSERT INTO reservas_tb (problema_id, usuario_id, "descripción", encabezado)
        VALUES ($1, $2, $3, $4);
      `;
      const { problemas_id, usuario_id, descripcion, encabezado } = reserva;
      await pool.query(query, [
        problemas_id,
        usuario_id,
        descripcion,
        encabezado,
      ]);
    } catch (error) {
      console.error("Error creating reservation:", error);
      throw error;
    }
  }

  // Eliminar una reserva por usuario
  static async deleteReservationByUsuario(
    reservaId: number,
    usuarioId: number
  ): Promise<void> {
    try {
      const query = `
        DELETE FROM reservas_tb
        WHERE reserva_id = $1 AND usuario_id = $2;
      `;
      await pool.query(query, [reservaId, usuarioId]);
    } catch (error) {
      console.error("Error deleting reservation:", error);
      throw error;
    }
  }
}
