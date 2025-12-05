Pruebas Funcionales del Sistema de Reservas de Canchas

Este documento describe las pruebas realizadas al sistema, los escenarios verificados y los resultados obtenidos. Cada prueba está alineada con los requerimientos funcionales del sistema.

⸻

1. Pruebas de Canchas

Prueba 1A – Crear cancha válida
	•	Request:
POST /canchas
	•	Resultado esperado:
201 Created
	•	Resultado obtenido:
Exitoso
	•	Notas:
Se creó correctamente la cancha.

⸻

Prueba 1B – Crear reserva con cancha inexistente
	•	Request:
POST /reservas
	•	Resultado esperado:
{ "error": "La cancha no existe" }
	•	Resultado obtenido:
Exitoso
	•	Notas:
La validación funciona correctamente.

⸻

2. Pruebas de Horarios y Validaciones

Prueba 2A – Horario válido
	•	Request:
POST /reservas
	•	Resultado esperado:
201 Created
	•	Resultado obtenido:
Exitoso

⸻

Prueba 2B – Mismo horario (0 minutos)
	•	Request:
POST /reservas
Hora inicio igual a hora fin
	•	Resultado esperado:
Error (no debe permitir reservas de 0 minutos)
	•	Resultado obtenido:
Se creó la reserva incorrectamente (antes de aplicar validación)
	•	Resultado final:
Validación corregida, ahora devuelve error como corresponde.

⸻

Prueba 2C – horaInicio > horaFin
	•	Request:
POST /reservas
	•	Resultado esperado:
Error
	•	Resultado obtenido:
Se creaba la reserva antes de aplicar validación; después de corregir, devuelve error correctamente.

⸻

3. Validaciones adicionales

Validar fecha no pasada
	•	Request:
POST /reservas con fecha anterior a la actual
	•	Resultado esperado:
"La fecha de la reserva debe ser futura"
	•	Resultado obtenido:
Inicialmente se permitía; después de corrección, la validación funciona.

⸻

Validar disponibilidad
	•	Request:
GET /reservas/disponibilidad/check
	•	Resultado esperado:
{ "disponible": false } cuando hay una reserva en ese rango
	•	Resultado obtenido:
Inicialmente incorrecto; después de ajuste en comparación de minutos, funciona correctamente.

⸻

4. Pruebas de Pago

Prueba 5A – Pagar reserva pendiente
	•	Request:
POST /reservas/:id/pagar
	•	Resultado esperado:
Estado cambia a "pagada"
	•	Resultado obtenido:
Exitoso
ID utilizado: (ejemplo)

⸻

Prueba 5B – Pagar dos veces la misma reserva
	•	Request:
POST /reservas/:id/pagar
	•	Resultado esperado:
Error "La reserva ya está pagada"
	•	Resultado obtenido:
Correcto

⸻

Prueba 5C – Pagar reserva cancelada
	•	Request:
Primero cancelar → POST /reservas/:id/cancelar
Luego pagar → POST /reservas/:id/pagar
	•	Resultado esperado:
Error "La reserva ya está cancelada"
	•	Resultado obtenido:
Correcto

⸻

5. Pruebas de Cancelación

Prueba 6A – Cancelar reserva pendiente
	•	Request:
POST /reservas/:id/cancelar
	•	Resultado esperado:
Estado "cancelada"
	•	Resultado obtenido:
Correcto

⸻

Prueba 6B – Cancelar dos veces
	•	Request:
POST /reservas/:id/cancelar otra vez
	•	Resultado esperado:
Error "La reserva ya está cancelada"
	•	Resultado obtenido:
Correcto

⸻

Conclusión de pruebas

Las pruebas iniciales expusieron errores en:
	•	Validación de horarios
	•	Validación de fecha futura
	•	Control de estados (pagada/cancelada)
	•	Validación de cancha existente
	•	Validación de disponibilidad por solapamiento

Después de aplicar correcciones, todas las pruebas funcionales fueron ejecutadas nuevamente, obteniendo los resultados esperados en cada caso.

El sistema ahora se considera estable y funcional según los requerimientos establecidos.