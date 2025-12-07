import { apiGet, apiPost } from "./apiClient";

export interface CanchaDTO {
  id: string;
  nombre: string;
  precioPorHora: number;
  activa: boolean;
}

export interface CrearCanchaPayload {
  nombre: string;
  precioPorHora: number;
}

interface RawCancha {
  props: {
    id: string;
    nombre: string;
    precioPorHora: number;
    activa: boolean;
  };
}

export async function crearCancha(
  data: CrearCanchaPayload
): Promise<CanchaDTO> {
  const raw = await apiPost<RawCancha>("/canchas", data);
  return {
    id: raw.props.id,
    nombre: raw.props.nombre,
    precioPorHora: raw.props.precioPorHora,
    activa: raw.props.activa,
  };
}

export async function listarCanchas(): Promise<CanchaDTO[]> {
  const rawList = await apiGet<RawCancha[]>("/canchas");

  return rawList.map((raw) => ({
    id: raw.props.id,
    nombre: raw.props.nombre,
    precioPorHora: raw.props.precioPorHora,
    activa: raw.props.activa,
  }));
}