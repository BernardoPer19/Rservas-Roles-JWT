import { Request, Response } from "express";
import { UsuarioReservasModel } from "../models/UserModel";
import { UserTypes } from "../types/AuthTypes";

export class UserController {
  static async getReservations(req: Request, res: Response) {
    try {
      const user = req.user as UserTypes;
      const reservas = await UsuarioReservasModel.getReservationsByUsuario(
        user.Usuario_id
      );
      res.status(200).json(reservas);
    } catch (error) {
      console.error("Error al obtener reservas del usuario:", error);
      res
        .status(500)
        .json({ message: "Error al obtener reservas del usuario" });
    }
  }

  static async createReservation(req: Request, res: Response) {
    try {
      const user = req.user as UserTypes;
      const { problemas_id, descripcion, encabezado } = req.body;
      await UsuarioReservasModel.createReservation({
        usuario_id: user.Usuario_id,
        problemas_id,
        descripcion,
        encabezado,
      });
      res.status(201).json({ message: "Reserva creada correctamente" });
    } catch (error) {
      console.error("Error al crear reserva:", error);
      res.status(500).json({ message: "Error al crear la reserva" });
    }
  }

  static async deleteReservation(req: Request, res: Response) {
    try {
      const user = req.user as UserTypes;
      const reservaId = Number(req.params.id);
      await UsuarioReservasModel.deleteReservationByUsuario(reservaId, user.Usuario_id);
      res.status(200).json({ message: "Reserva eliminada correctamente" });
    } catch (error) {
      console.error("Error al eliminar reserva:", error);
      res.status(500).json({ message: "Error al eliminar la reserva" });
    }
  }
}
