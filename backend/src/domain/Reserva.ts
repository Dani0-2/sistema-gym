export interface ReservaProps {
  id: string;
  canchaId: string;
  usuarioId: string;
  fecha: string;     // YYYY-MM-DD
  horaInicio: string; // HH:MM
  horaFin: string;    // HH:MM
  estado: "pendiente" | "pagada" | "cancelada";
  creadoEn: Date;
}

export class Reserva {
  constructor(public props: ReservaProps) {}

  cancelar() {
    if (this.props.estado === "cancelada") {
      throw new Error("La reserva ya está cancelada");
    }

    if (this.props.estado === "pagada") {
    }

    this.props.estado = "cancelada";
  }
}