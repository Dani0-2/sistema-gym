import type { CrearReservaPayload } from "../services/reservasApi";

export type ValidationError = string;

export interface ReservaValidationResult {
  isValid: boolean;
  errors: ValidationError[];
}

export type ReservaValidationStrategy = (data: CrearReservaPayload) => ReservaValidationResult;


export const basicReservaValidation: ReservaValidationStrategy = (data) => {
  const errors: string[] = [];

  if (!data.canchaId.trim()) errors.push("La cancha es obligatoria.");
  if (!data.usuarioId.trim()) errors.push("El usuario es obligatorio.");
  if (!data.fecha.trim()) errors.push("La fecha es obligatoria.");
  if (!data.horaInicio.trim() || !data.horaFin.trim()) {
    errors.push("La hora de inicio y fin son obligatorias.");
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};


export const strictReservaValidation: ReservaValidationStrategy = (data) => {
  const base = basicReservaValidation(data);
  const errors = [...base.errors];


  if (!/^\d{4}-\d{2}-\d{2}$/.test(data.fecha)) {
    errors.push("La fecha debe tener formato YYYY-MM-DD.");
  }


  const horaRegex = /^\d{2}:\d{2}$/;
  if (!horaRegex.test(data.horaInicio) || !horaRegex.test(data.horaFin)) {
    errors.push("Las horas deben tener formato HH:MM.");
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

export const reservaValidationStrategies = {
  basic: basicReservaValidation,
  strict: strictReservaValidation,
};