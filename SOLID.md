# Evidencia de principios SOLID en el backend

Este documento describe cómo se aplican los principios SOLID en el proyecto **Sistema de Reservas de Canchas**.

---

## SRP – Single Responsibility Principle

Cada clase tiene una responsabilidad clara:

- `CanchasService` (`src/services/CanchasService.ts`): lógica de negocio de canchas.
- `ReservasService` (`src/services/ReservasService.ts`): lógica de negocio de reservas (validaciones, disponibilidad, pago, cancelación).
- `CanchasController` y `ReservasController` (`src/controllers/...`): se encargan de recibir la solicitud HTTP, delegar al servicio y devolver la respuesta.
- `CanchasInMemoryRepository`, `ReservasInMemoryRepository` (`src/repositories/...`): solo leen/escriben datos.

---

## OCP – Open/Closed Principle

Los servicios están abiertos a extensión, pero cerrados a modificación:

- `CanchasService` y `ReservasService` dependen de:
  - `ICanchasRepository`
  - `IReservasRepository`
  - `IPaymentGateway`

Para cambiar la persistencia o el proveedor de pagos basta con crear nuevas implementaciones de esas interfaces sin modificar el código de los servicios.

---

## LSP – Liskov Substitution Principle

Las implementaciones concretas pueden sustituir a sus interfaces sin romper el comportamiento:

- `CanchasInMemoryRepository` implementa `ICanchasRepository`.
- `ReservasInMemoryRepository` implementa `IReservasRepository`.
- `FakePaymentGateway` implementa `IPaymentGateway`.

En cualquier punto donde se use la interfaz se puede inyectar otra implementación (por ejemplo, un repositorio con base de datos real) sin cambiar el código cliente.

---

## ISP – Interface Segregation Principle

Las interfaces son específicas a cada necesidad:

- `ICanchasRepository` define solo operaciones de canchas.
- `IReservasRepository` define solo operaciones de reservas.
- `IPaymentGateway` define solo lo necesario para cobrar una reserva.

Ninguna clase está obligada a implementar métodos que no necesita.

---

## DIP – Dependency Inversion Principle

Los módulos de alto nivel dependen de abstracciones, no de detalles:

- `ReservasService` recibe:
  - `IReservasRepository`
  - `ICanchasRepository`
  - `IPaymentGateway`

Estos se instancian en las rutas:

- `src/routes/reservasRoutes.ts`
- `src/routes/canchasRoutes.ts`

De esta manera, la lógica de negocio trabaja siempre contra interfaces y las implementaciones concretas se pueden cambiar sin modificar los servicios.