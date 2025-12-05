# Patrones de diseño en el backend

Este documento describe los patrones aplicados en el backend del sistema **Sistema de Reservas de Canchas**.

---

## 1. Repository Pattern

**Problema:** evitar que la lógica de negocio dependa directamente de la tecnología de persistencia.

**Solución:** definir interfaces de repositorio y usar implementaciones InMemory como detalle reemplazable.

**Archivos:**

- `src/repositories/ICanchasRepository.ts`
- `src/repositories/IReservasRepository.ts`
- `src/repositories/CanchasInMemoryRepository.ts`
- `src/repositories/ReservasInMemoryRepository.ts`
- Uso en servicios:
  - `src/services/CanchasService.ts`
  - `src/services/ReservasService.ts`

---

## 2. Adapter Pattern (Gateway de pagos)

**Problema:** desacoplar el sistema del proveedor de pagos.

**Solución:** definir una interfaz `IPaymentGateway` y una implementación `FakePaymentGateway` que actúa como adaptador.

**Archivos:**

- `src/infrastructure/payments/IPaymentGateway.ts`
- `src/infrastructure/payments/FakePaymentGateway.ts`
- Uso en:
  - `src/services/ReservasService.ts`

---

## 3. Domain Model

**Problema:** reglas de negocio dispersas en controladores/servicios.

**Solución:** encapsular la lógica en entidades ricas.

**Archivos:**

- `src/domain/Reserva.ts`
- `src/domain/Cancha.ts`

Ejemplos de métodos:

- `Reserva.marcarComoPagada()`
- `Reserva.cancelar()`

---

> Los patrones de frontend se documentarán en este mismo archivo en la sección “Patrones – Frontend” cuando se implemente la SPA (React).