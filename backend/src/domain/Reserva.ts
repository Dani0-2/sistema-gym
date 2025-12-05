export interface ReservaProps {
  id: string;
  canchaId: string;
  usuarioId: string;
  fecha: string;      // YYYY-MM-DD
  horaInicio: string; // HH:MM
  horaFin: string;    // HH:MM
  estado: "pendiente" | "pagada" | "cancelada";
  creadoEn: Date;
}

export class Reserva {
  constructor(public props: ReservaProps) {}

  marcarComoPagada() {
    if (this.props.estado === "cancelada") {
      throw new Error("No se puede pagar una reserva cancelada");
    }

    if (this.props.estado === "pagada") {
      throw new Error("La reserva ya está pagada");
    }

    this.props.estado = "pagada";
  }

  cancelar() {
    if (this.props.estado === "cancelada") {
      throw new Error("La reserva ya está cancelada");
    }

    // aquí luego puedes meter lógica de reembolso si estaba pagada
    this.props.estado = "cancelada";
  }
}