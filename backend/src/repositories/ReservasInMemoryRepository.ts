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
}