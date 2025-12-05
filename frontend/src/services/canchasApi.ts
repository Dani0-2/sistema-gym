import { apiGet, apiPost } from "./apiClient";

export interface CanchaDTO {
  props: {
    id: string;
    nombre: string;
    precioPorHora: number;
    activa: boolean;
  };
}

export interface CrearCanchaPayload {
  nombre: string;
  precioPorHora: number;
}

export async function crearCancha(data: CrearCanchaPayload): Promise<CanchaDTO> {
  return apiPost<CanchaDTO>("/canchas", data);
}

export async function listarCanchas(): Promise<CanchaDTO[]> {
  return apiGet<CanchaDTO[]>("/canchas");
}