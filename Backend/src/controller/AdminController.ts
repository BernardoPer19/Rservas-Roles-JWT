import { Request, Response } from "express";
import { AdminModel } from "../models/AdminModel";

export class AdminController {
  static async getAllReservations(_req: Request, res: Response) {
    try {
      const reservas = await AdminModel.getAllReservations();
      res.status(200).json(reservas);
    } catch (error) {
      console.error("Error al obtener reservas:", error);
      res.status(500).json({ message: "Error al obtener todas las reservas" });
    }
  }

  static async createReservation(req: Request, res: Response) {
    try {
      const { usuario_id, problema_id, estado_id, descripcion, encabezado } =
        req.body;
      await AdminModel.createReservation(
        usuario_id,
        problema_id,
        estado_id,
        descripcion,
        encabezado
      );
      res
        .status(201)
        .json({ message: "Reserva creada por admin correctamente" });
    } catch (error) {
      console.error("Error al crear reserva como admin:", error);
      res.status(500).json({ message: "Error al crear la reserva" });
    }
  }

  static async deleteReservation(req: Request, res: Response) {
    try {
      const reservaId = Number(req.params.id);
      await AdminModel.deleteReservation(reservaId);
      res
        .status(200)
        .json({ message: "Reserva eliminada correctamente por admin" });
    } catch (error) {
      console.error("Error al eliminar reserva como admin:", error);
      res.status(500).json({ message: "Error al eliminar la reserva" });
    }
  }
}
