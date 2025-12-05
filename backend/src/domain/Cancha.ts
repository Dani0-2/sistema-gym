export interface CanchaProps {
  id: string;
  nombre: string;
  tipo: string; // ej: "futbol 5", "basket", etc.
  ubicacion: string;
  precioPorHora: number;
  activa: boolean;
  creadoEn: Date;
}

export class Cancha {
  constructor(public props: CanchaProps) {}

  actualizarDatos(data: Partial<Omit<CanchaProps, "id" | "creadoEn">>) {
    if (data.nombre !== undefined) this.props.nombre = data.nombre;
    if (data.tipo !== undefined) this.props.tipo = data.tipo;
    if (data.ubicacion !== undefined) this.props.ubicacion = data.ubicacion;
    if (data.precioPorHora !== undefined)
      this.props.precioPorHora = data.precioPorHora;
    if (data.activa !== undefined) this.props.activa = data.activa;
  }

  desactivar() {
    this.props.activa = false;
  }
}