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
  props: ReservaProps;

  constructor(props: ReservaProps) {
    this.props = props;
  }
}