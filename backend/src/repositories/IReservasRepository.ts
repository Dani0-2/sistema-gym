import { Reserva } from "../domain/Reserva";

export interface IReservasRepository {
  create(reserva: Reserva): Promise<void>;
  findById(id: string): Promise<Reserva | null>;
  findByCanchaYFecha(canchaId: string, fecha: string): Promise<Reserva[]>;
  update(reserva: Reserva): Promise<void>;
}