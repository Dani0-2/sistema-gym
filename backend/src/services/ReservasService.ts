import { IReservasRepository } from "../repositories/IReservasRepository";
import { Reserva } from "../domain/Reserva";
import { randomUUID } from "crypto";

export class ReservasService {
  constructor(private reservasRepo: IReservasRepository) {}

  async crearReserva(data: {
    canchaId: string;
    usuarioId: string;
    fecha: string;
    horaInicio: string;
    horaFin: string;
  }) {
    const reserva = new Reserva({
      id: randomUUID(),
      estado: "pendiente",
      creadoEn: new Date(),
      ...data,
    });

    await this.reservasRepo.create(reserva);
    return reserva;
  }
}