Trazabilidad entre Historias de Usuario y Endpoints

Este documento relaciona cada Historia de Usuario (HU) del sistema con los componentes del backend que la implementan: endpoints, servicios, controladores y repositorios.

La trazabilidad permite verificar que cada requerimiento funcional está cubierto por una implementación concreta dentro del sistema.

⸻

1. Tabla de Trazabilidad HU → Endpoints
| Historia de Usuario | Descripción | Endpoint | Componentes |
|---------------------|-------------|----------|-------------|
| HU-01 | Consultar disponibilidad | `GET /reservas/disponibilidad/check` | `ReservasController.consultarDisponibilidad`, `ReservasService.verificarDisponibilidad`, `ReservasInMemoryRepository.findByCanchaYFecha` |
| HU-02 | Validar solapamiento | `GET /reservas/disponibilidad/check` | `ReservasService.verificarDisponibilidad` (comparación de rangos horarios) |
| HU-03 | Crear reserva | `POST /reservas` | `ReservasController.crearReserva`, `ReservasService.crearReserva`, repositorios y validaciones |
| HU-04 | Obtener reserva por ID | `GET /reservas/:id` | `ReservasController.obtenerReservaPorId`, `ReservasService.obtenerReservaPorId`, repositorio |
| HU-05 | Pagar reserva | `POST /reservas/:id/pagar` | `ReservasController.pagarReserva`, `ReservasService.pagarReserva`, `IPaymentGateway`, `FakePaymentGateway`, `Reserva.marcarComoPagada()` |
| HU-06 | Cancelar reserva | `POST /reservas/:id/cancelar` | `ReservasController.cancelarReserva`, `ReservasService.cancelarReserva`, `Reserva.cancelar()` |
| HU-07 | CRUD de canchas | `POST /canchas`, `GET /canchas`, `GET /canchas/:id`, `PUT /canchas/:id`, `DELETE /canchas/:id` | `CanchasController`, `CanchasService`, repositorios |
| HU-08 | Validar cancha existente antes de reservar | `POST /reservas` | Validación en `ReservasService.crearReserva` mediante `canchasRepo.findById` |
| HU-09 | Validar horarios correctos | `POST /reservas` | Validación de horas en `ReservasService.crearReserva` |
| HU-10 | Validar fecha futura | `POST /reservas` | Comparación de fecha con fecha actual |
| HU-11 | Validar cancha activa | `POST /reservas` | Verificación `cancha.props.activa` en `ReservasService.crearReserva` |

2. Detalle de implementación por Historia de Usuario

HU-01 & HU-02 — Consultar disponibilidad y evitar solapamientos
	•	Endpoint:
	•	GET /reservas/disponibilidad/check
	•	Lógica principal:
	•	Conversión de horas a minutos: horaToMinutos()
	•	Evaluación de traslape: comparación de rangos horarios
	•	Capas involucradas:
	•	Controller → consultarDisponibilidad
	•	Service → verificarDisponibilidad
	•	Repository → findByCanchaYFecha

⸻

HU-03 — Crear reserva
	•	Endpoint:
	•	POST /reservas
	•	Validaciones consideradas:
	•	Cancha existente
	•	Cancha activa
	•	Fecha futura
	•	Horario válido (inicio < fin)
	•	No traslape
	•	Lógica principal:
	•	ReservasService.crearReserva
	•	Entidad Reserva

⸻

HU-04 — Consultar reserva por ID
	•	Endpoint:
	•	GET /reservas/:id
	•	Lógica principal:
	•	ReservasInMemoryRepository.findById
	•	ReservasService.obtenerReservaPorId

⸻

HU-05 — Pago de reserva
	•	Endpoint:
	•	POST /reservas/:id/pagar
	•	Patrón aplicado:
	•	Adapter (IPaymentGateway + FakePaymentGateway)
	•	Reglas:
	•	Validar que la reserva esté en estado pendiente
	•	Evitar pagos duplicados

⸻

HU-06 — Cancelar reserva
	•	Endpoint:
	•	POST /reservas/:id/cancelar
	•	Reglas:
	•	No se puede cancelar dos veces
	•	No se puede pagar luego de cancelar
	•	Implementación:
	•	Método cancelar() dentro de la entidad Reserva

⸻

HU-07 — CRUD de canchas
	•	Endpoints:
	•	POST /canchas
	•	GET /canchas
	•	GET /canchas/:id
	•	PUT /canchas/:id
	•	DELETE /canchas/:id
	•	Lógica:
	•	Administrar disponibilidad y atributos de canchas
	•	Validar datos actualizados
	•	Llamadas a:
	•	CanchasService
	•	CanchasController

⸻

HU-08 — Validar existencia de cancha antes de reservar
	•	Validación:
	•	this.canchasRepo.findById(data.canchaId)
	•	Mensaje de error:
	•	"La cancha no existe"

⸻

HU-09 y HU-10 — Validaciones de horario y fecha
	•	Validaciones:
	•	horaInicio < horaFin
	•	Fecha futura: comparación con fecha actual
	•	Lugar:
	•	ReservasService.crearReserva

⸻

HU-11 — Cancha activa
	•	Validación:
	•	if (!cancha.props.activa) throw new Error("La cancha está inactiva")

⸻

3. Conclusión

Cada historia de usuario tiene una asociación directa con:
	•	Un endpoint
	•	Un controlador
	•	Una función de servicio
	•	Un método en el repositorio o entidad

Esto garantiza que el sistema cumple los requerimientos funcionales y puede trazarse cada HU a su implementación correspondiente.