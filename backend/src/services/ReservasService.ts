import { IReservasRepository } from "../repositories/IReservasRepository";
import { Reserva } from "../domain/Reserva";
import { randomUUID } from "crypto";

function horaToMinutos(hora: string): number {
  const [h = 0, m = 0] = hora.split(":").map(Number);
  return h * 60 + m;
}

export class ReservasService {
  constructor(private reservasRepo: IReservasRepository) {}

  async verificarDisponibilidad(data: {
    canchaId: string;
    fecha: string;
    horaInicio: string;
    horaFin: string;
  }): Promise<{ disponible: boolean }> {
    const reservas = await this.reservasRepo.findByCanchaYFecha(
      data.canchaId,
      data.fecha
    );

    const nuevaInicio = horaToMinutos(data.horaInicio);
    const nuevaFin = horaToMinutos(data.horaFin);

    const hayTraslape = reservas.some((r) => {
    const inicio = horaToMinutos(r.props.horaInicio);
    const fin = horaToMinutos(r.props.horaFin);

      return nuevaInicio < fin && nuevaFin > inicio;
    });

    return { disponible: !hayTraslape };
  }

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
    async obtenerReservaPorId(id: string): Promise<Reserva | null> {
    const reserva = await this.reservasRepo.findById(id);
    return reserva ?? null;
  }

    async cancelarReserva(id: string): Promise<Reserva> {
    const reserva = await this.reservasRepo.findById(id);
    if (!reserva) {
      throw new Error("Reserva no encontrada");
    }
    reserva.cancelar();
    await this.reservasRepo.update(reserva);
    return reserva;
  }
}