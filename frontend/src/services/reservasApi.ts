import { apiGet, apiPost } from "./apiClient";

export interface CrearReservaPayload {
  canchaId: string;
  usuarioId: string;
  fecha: string;   
  horaInicio: string; 
  horaFin: string;  
}

export interface ReservaDTO {
  id: string;
  canchaId: string;
  usuarioId: string;
  fecha: string;
  horaInicio: string;
  horaFin: string;
  estado: string;    
  creadoEn?: string; 
}

interface RawReserva {
  props: {
    id: string;
    canchaId: string;
    usuarioId: string;
    fecha: string;
    horaInicio: string;
    horaFin: string;
    estado: string;
    creadoEn?: string;
  };
}

function mapReserva(raw: RawReserva): ReservaDTO {
  return {
    id: raw.props.id,
    usuarioId: raw.props.usuarioId,
    canchaId: raw.props.canchaId,
    fecha: raw.props.fecha,
    horaInicio: raw.props.horaInicio,
    horaFin: raw.props.horaFin,
    estado: raw.props.estado,
    creadoEn: raw.props.creadoEn,
  };
}

export async function crearReserva(
  data: CrearReservaPayload
): Promise<ReservaDTO> {
  const raw = await apiPost<RawReserva>("/reservas", data);
  return mapReserva(raw);
}

export async function pagarReserva(id: string): Promise<ReservaDTO> {
  const raw = await apiPost<RawReserva>(`/reservas/${id}/pagar`);
  return mapReserva(raw);
}

export async function cancelarReserva(id: string): Promise<ReservaDTO> {
  const raw = await apiPost<RawReserva>(`/reservas/${id}/cancelar`);
  return mapReserva(raw);
}

export async function obtenerReserva(id: string): Promise<ReservaDTO> {
  const raw = await apiGet<RawReserva>(`/reservas/${id}`);
  return mapReserva(raw);
}