import { Request, Response } from "express";
import { ReservasService } from "../services/ReservasService";

export class ReservasController {
  constructor(private reservasService: ReservasService) {}
  
  consultarDisponibilidad = async (req: Request, res: Response) => {
    try {
      const { canchaId, fecha, horaInicio, horaFin } = req.query as {
        canchaId?: string;
        fecha?: string;
        horaInicio?: string;
        horaFin?: string;
      };

      if (!canchaId || !fecha || !horaInicio || !horaFin) {
        return res.status(400).json({
          error:
            "canchaId, fecha, horaInicio y horaFin son parámetros requeridos",
        });
      }

      const resultado = await this.reservasService.verificarDisponibilidad({
        canchaId,
        fecha,
        horaInicio,
        horaFin,
      });

      res.json(resultado);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  };

  crearReserva = async (req: Request, res: Response) => {
    try {
      const reserva = await this.reservasService.crearReserva(req.body);
      res.status(201).json(reserva);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  };
  
 obtenerReservaPorId = async (req: Request, res: Response) => {
  try {
    const { id } = req.params as { id: string };

    if (!id) {
      return res.status(400).json({ error: "El id de la reserva es requerido" });
    }

    const reserva = await this.reservasService.obtenerReservaPorId(id);

    if (!reserva) {
      return res.status(404).json({ error: "Reserva no encontrada" });
    }

    res.json(reserva);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

  cancelarReserva = async (req: Request, res: Response) => {
    try {
      const { id } = req.params as { id: string };

      const reserva = await this.reservasService.cancelarReserva(id);

      res.json(reserva);
    } catch (error: any) {
      if (error.message === "Reserva no encontrada") {
        return res.status(404).json({ error: error.message });
      }

      res.status(400).json({ error: error.message });
    }
  };
    pagarReserva = async (req: Request, res: Response) => {
    try {
      const { id } = req.params as { id: string };

      const reserva = await this.reservasService.pagarReserva(id);

      res.json(reserva);
    } catch (error: any) {
      if (error.message === "Reserva no encontrada") {
        return res.status(404).json({ error: error.message });
      }

      res.status(400).json({ error: error.message });
    }
  };
}