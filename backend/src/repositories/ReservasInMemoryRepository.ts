import { IReservasRepository } from "./IReservasRepository";
import { Reserva } from "../domain/Reserva";

export class ReservasInMemoryRepository implements IReservasRepository {
  private reservas: Reserva[] = [];

  async create(reserva: Reserva): Promise<void> {
    this.reservas.push(reserva);
  }

  async findById(id: string): Promise<Reserva | null> {
    return this.reservas.find(r => r.props.id === id) ?? null;
  }
  async findByCanchaYFecha(canchaId: string, fecha: string): Promise<Reserva[]> {
    return this.reservas.filter(
      (r) => r.props.canchaId === canchaId && r.props.fecha === fecha
    );
  }
  async update(reserva: Reserva): Promise<void> {
    const index = this.reservas.findIndex((r) => r.props.id === reserva.props.id);
    if (index !== -1) {
      this.reservas[index] = reserva;
    }
  }
}