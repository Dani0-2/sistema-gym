import { IPaymentGateway } from "./IPaymentGateway";
import { Reserva } from "../../domain/Reserva";

export class FakePaymentGateway implements IPaymentGateway {
  async cobrarReserva(reserva: Reserva): Promise<void> {
    // Aquí podrías simular fallos, logs, etc.
    console.log(
      `Cobro simulado para la reserva ${reserva.props.id} de la cancha ${reserva.props.canchaId}`
    );
    // No devolvemos nada, asumimos que siempre sale bien
  }
}