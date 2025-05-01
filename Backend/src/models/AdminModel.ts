import pool from "../db/db";
import { ReservaDBRJoin } from "../types/ReservasTypes";

export class AdminModel {
  static async getAllReservations(): Promise<ReservaDBRJoin[]> {
    try {
      const query = `
            SELECT 
              r.reserva_id,
              p.problema_id,
              u."Usuario_id",
              r."descripción" AS descripcion, 
              r."createAt",
              r.encabezado,
              e.estado_id
            FROM
              reservas_tb r
            INNER JOIN usuarios_tb u ON r.usuario_id = u."Usuario_id"
            INNER JOIN problemas_tb p ON r.problema_id = p.problema_id
            INNER JOIN estados_tb e ON r.estado_id = e.estado_id;
          `;
      const result = await pool.query(query);
      return result.rows;
    } catch (error) {
      console.error("Error getting reservations:", error);
      throw error;
    }
  }

  static async updateReservationStatus(
    reservaId: number,
    estadoId: number
  ): Promise<void> {
    try {
      const query = `
        UPDATE reservas_tb
        SET estado_id = $1
        WHERE reserva_id = $2;
      `;
      await pool.query(query, [estadoId, reservaId]);
    } catch (error) {
      console.error("Error updating reservation status:", error);
      throw error;
    }
  }

  static async deleteReservation(reservaId: number): Promise<void> {
    try {
      const query = `
        DELETE FROM reservas_tb
        WHERE reserva_id = $1;
      `;
      await pool.query(query, [reservaId]);
    } catch (error) {
      console.error("Error deleting reservation:", error);
      throw error;
    }
  }

  static async createReservation(
    usuarioId: number,
    problemaId: number,
    estadoId: number,
    descripcion: string,
    encabezado: string
  ): Promise<void> {
    try {
      const query = `
        INSERT INTO reservas_tb (usuario_id, problema_id, estado_id, "descripción", encabezado)
        VALUES ($1, $2, $3, $4, $5);
      `;
      await pool.query(query, [
        usuarioId,
        problemaId,
        estadoId,
        descripcion,
        encabezado,
      ]);
    } catch (error) {
      console.error("Error creating reservation:", error);
      throw error;
    }
  }
}
