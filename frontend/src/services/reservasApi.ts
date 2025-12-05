import { apiGet, apiPost } from "./apiClient";

export interface CrearReservaPayload {
  canchaId: string;
  usuarioId: string;
  fecha: string;   
  horaInicio: string; 
  horaFin: string;   
}

export interface ReservaDTO {
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

export async function crearReserva(data: CrearReservaPayload): Promise<ReservaDTO> {
  return apiPost<ReservaDTO>("/reservas", data);
}

export async function pagarReserva(id: string): Promise<ReservaDTO> {
  return apiPost<ReservaDTO>(`/reservas/${id}/pagar`);
}

export async function cancelarReserva(id: string): Promise<ReservaDTO> {
  return apiPost<ReservaDTO>(`/reservas/${id}/cancelar`);
}

export async function obtenerReserva(id: string): Promise<ReservaDTO> {
  return apiGet<ReservaDTO>(`/reservas/${id}`);
}