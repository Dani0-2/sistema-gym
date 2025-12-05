// frontend/src/hooks/useReservaForm.ts
import { useState } from "react";
import type { CrearReservaPayload, ReservaDTO } from "../services/reservasApi";
import { crearReserva } from "../services/reservasApi";
import {
  reservaValidationStrategies,
} from "../validation/reservaValidationStrategies";

import type {
  ReservaValidationStrategy,
} from "../validation/reservaValidationStrategies";

type StrategyKey = keyof typeof reservaValidationStrategies;

interface UseReservaFormOptions {
  strategy?: StrategyKey;
}

export function useReservaForm(options?: UseReservaFormOptions) {
  const [form, setForm] = useState<CrearReservaPayload>({
    canchaId: "",
    usuarioId: "",
    fecha: "",
    horaInicio: "",
    horaFin: "",
  });

  const [errors, setErrors] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [lastReserva, setLastReserva] = useState<ReservaDTO | null>(null);

  const strategyKey: StrategyKey = options?.strategy ?? "basic";
  const validationStrategy: ReservaValidationStrategy =
    reservaValidationStrategies[strategyKey];

  function handleChange(
    field: keyof CrearReservaPayload,
    value: string,
  ) {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  }

  async function handleSubmit() {
    const result = validationStrategy(form);
    if (!result.isValid) {
      setErrors(result.errors);
      return;
    }
    setErrors([]);
    setIsSubmitting(true);
    try {
      const reserva = await crearReserva(form);
      setLastReserva(reserva);
    } catch (err) {
      setErrors([(err as Error).message || "Error al crear la reserva"]);
    } finally {
      setIsSubmitting(false);
    }
  }

  return {
    form,
    errors,
    isSubmitting,
    lastReserva,
    setLastReserva,
    handleChange,
    handleSubmit,
  };
}