# Trazabilidad entre Historias de Usuario y Endpoints

Este documento relaciona cada Historia de Usuario (HU) con los componentes del backend que la implementan:  
endpoints, controladores, servicios, repositorios y reglas de negocio.

La trazabilidad permite verificar que cada requerimiento funcional está cubierto por una implementación concreta.

---

## 1. Tabla de Trazabilidad HU → Endpoints → Componentes

| Historia de Usuario | Descripción | Endpoint | Componentes involucrados |
|---------------------|-------------|----------|---------------------------|
| **HU-01** | Consultar disponibilidad | `GET /reservas/disponibilidad/check` | `ReservasController.consultarDisponibilidad`, `ReservasService.verificarDisponibilidad`, `ReservasInMemoryRepository.findByCanchaYFecha` |
| **HU-02** | Validar solapamiento | `GET /reservas/disponibilidad/check` | `ReservasService.verificarDisponibilidad` (comparación de rangos horarios) |
| **HU-03** | Crear reserva | `POST /reservas` | `ReservasController.crearReserva`, `ReservasService.crearReserva`, `ReservasInMemoryRepository.create`, validaciones de dominio |
| **HU-04** | Obtener reserva por ID | `GET /reservas/:id` | `ReservasController.obtenerReservaPorId`, `ReservasService.obtenerReservaPorId`, `ReservasInMemoryRepository.findById` |
| **HU-05** | Pagar reserva | `POST /reservas/:id/pagar` | `ReservasController.pagarReserva`, `ReservasService.pagarReserva`, `IPaymentGateway`, `FakePaymentGateway`, `Reserva.marcarComoPagada()` |
| **HU-06** | Cancelar reserva | `POST /reservas/:id/cancelar` | `ReservasController.cancelarReserva`, `ReservasService.cancelarReserva`, `Reserva.cancelar()` |
| **HU-07** | CRUD de canchas | `POST/GET/PUT/DELETE /canchas` | `CanchasController`, `CanchasService`, `CanchasInMemoryRepository` |
| **HU-08** | Validar cancha existente antes de reservar | `POST /reservas` | `ReservasService.crearReserva → canchasRepo.findById` |
| **HU-09** | Validar horarios correctos | `POST /reservas` | `ReservasService.crearReserva`, función `horaToMinutos` |
| **HU-10** | Validar fecha futura | `POST /reservas` | Comparación contra fecha del sistema en `ReservasService.crearReserva` |
| **HU-11** | Validar que la cancha esté activa | `POST /reservas` | `ReservasService.crearReserva`, validación `cancha.props.activa` |

---

## 2. Detalle de Implementación por Historia de Usuario

---

### **HU-01 & HU-02 — Consultar disponibilidad y evitar solapamientos**

**Endpoint:**  
- `GET /reservas/disponibilidad/check`

**Lógica clave:**
- Conversión de horas a minutos (`horaToMinutos`)
- Comparación de rangos horarios para detectar solapamientos

**Capas involucradas:**
- Controller → `consultarDisponibilidad`
- Service → `verificarDisponibilidad`
- Repository → `findByCanchaYFecha`

---

### **HU-03 — Crear reserva**

**Endpoint:**  
- `POST /reservas`

**Validaciones incluidas:**
- Cancha existente
- Cancha activa
- Fecha futura
- Horario válido (`inicio < fin`)
- No traslape con otras reservas

**Implementación:**
- `ReservasService.crearReserva`
- Entidad `Reserva`

---

### **HU-04 — Consultar reserva por ID**

**Endpoint:**  
- `GET /reservas/:id`

**Implementación:**
- `ReservasService.obtenerReservaPorId`
- `ReservasInMemoryRepository.findById`

---

### **HU-05 — Pago de reserva**

**Endpoint:**  
- `POST /reservas/:id/pagar`

**Patrón utilizado:**
- **Adapter Pattern** → `IPaymentGateway` + `FakePaymentGateway`

**Reglas:**
- Solo se puede pagar una reserva pendiente
- No se aceptan pagos duplicados

---

### **HU-06 — Cancelar reserva**

**Endpoint:**  
- `POST /reservas/:id/cancelar`

**Reglas:**
- No cancelar dos veces
- No pagar una reserva ya cancelada

**Implementación:**
- `Reserva.cancelar()`
- `ReservasService.cancelarReserva`

---

### **HU-07 — CRUD de canchas**

**Endpoints:**
- `POST /canchas`
- `GET /canchas`
- `GET /canchas/:id`
- `PUT /canchas/:id`
- `DELETE /canchas/:id`

**Implementación:**
- `CanchasController`
- `CanchasService`
- `CanchasInMemoryRepository`

---

### **HU-08 — Validar existencia de cancha**

**Validación:**
- `this.canchasRepo.findById(data.canchaId)`

**Error generado:**
- `"La cancha no existe"`

---

### **HU-09 — Validar horarios**

Validaciones:
- `horaInicio < horaFin`

Lugar:
- `ReservasService.crearReserva`

---

### **HU-10 — Validar fecha futura**

Validación:
- Comparación con fecha del sistema

Lugar:
- `ReservasService.crearReserva`

---

### **HU-11 — Validar cancha activa**

Validación:
- `if (!cancha.props.activa) throw new Error("La cancha está inactiva");`

---

## 3. Conclusión

Cada Historia de Usuario está directamente asociada con:

- Un **endpoint**
- Un **controlador**
- Una **función de servicio**
- Un **repositorio** o una **entidad de dominio**

Esto garantiza trazabilidad completa entre requerimientos y su implementación real, asegurando un sistema mantenible, escalable y correctamente documentado.