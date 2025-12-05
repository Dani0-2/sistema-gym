import { Request, Response } from "express";
import { ReservasService } from "../services/ReservasService";

export class ReservasController {
  constructor(private reservasService: ReservasService) {}

  crearReserva = async (req: Request, res: Response) => {
    try {
      const reserva = await this.reservasService.crearReserva(req.body);
      res.status(201).json(reserva);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  };
}