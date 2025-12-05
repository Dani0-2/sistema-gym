import { Reserva } from "../../domain/Reserva";

export interface IPaymentGateway {
  cobrarReserva(reserva: Reserva): Promise<void>;
}