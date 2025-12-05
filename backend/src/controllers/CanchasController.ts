import { Request, Response } from "express";
import { CanchasService } from "../services/CanchasService";

export class CanchasController {
  constructor(private canchasService: CanchasService) {}

  crearCancha = async (req: Request, res: Response) => {
    try {
      const cancha = await this.canchasService.crearCancha(req.body);
      res.status(201).json(cancha);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  };

  listarCanchas = async (_req: Request, res: Response) => {
    try {
      const canchas = await this.canchasService.listarCanchas();
      res.json(canchas);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  };

  obtenerCanchaPorId = async (req: Request, res: Response) => {
    try {
      const { id } = req.params as { id: string };
      const cancha = await this.canchasService.obtenerCanchaPorId(id);
      res.json(cancha);
    } catch (error: any) {
      if (error.message === "Cancha no encontrada") {
        return res.status(404).json({ error: error.message });
      }
      res.status(400).json({ error: error.message });
    }
  };

  actualizarCancha = async (req: Request, res: Response) => {
    try {
      const { id } = req.params as { id: string };
      const cancha = await this.canchasService.actualizarCancha(id, req.body);
      res.json(cancha);
    } catch (error: any) {
      if (error.message === "Cancha no encontrada") {
        return res.status(404).json({ error: error.message });
      }
      res.status(400).json({ error: error.message });
    }
  };

  eliminarCancha = async (req: Request, res: Response) => {
    try {
      const { id } = req.params as { id: string };
      await this.canchasService.eliminarCancha(id);
      res.status(204).send();
    } catch (error: any) {
      if (error.message === "Cancha no encontrada") {
        return res.status(404).json({ error: error.message });
      }
      res.status(400).json({ error: error.message });
    }
  };
}