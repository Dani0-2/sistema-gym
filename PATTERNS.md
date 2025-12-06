## Patrones en el Frontend (React)

### 1. Adapter para consumo de API

**Intención:** desacoplar los componentes de React de los detalles de `fetch`/URLs y tener un solo punto de acceso a la API del backend.

**Implementación:**

- `frontend/src/services/apiClient.ts`  
  - Funciones `apiGet` y `apiPost` encapsulan `fetch` y el manejo básico de errores.
- `frontend/src/services/reservasApi.ts`  
  - Usa `apiClient` para exponer operaciones de alto nivel: `crearReserva`, `pagarReserva`, `cancelarReserva`, `obtenerReserva`.
- `frontend/src/services/canchasApi.ts`  
  - Usa `apiClient` para exponer `crearCancha` y `listarCanchas`.

**Ruta en el código:** los componentes nunca llaman `fetch` directamente, siempre usan estos adaptadores.

---

### 2. Strategy + Custom Hook para validación de reservas

**Intención:** poder cambiar la lógica de validación del formulario de reserva sin modificar el componente, seleccionando distintas estrategias.

**Implementación:**

- `frontend/src/validation/reservaValidationStrategies.ts`  
  - Define el tipo `ReservaValidationStrategy` y dos estrategias:
    - `basicReservaValidation`
    - `strictReservaValidation`
- `frontend/src/hooks/useReservaForm.ts`  
  - Hook que recibe una `strategy` (`"basic"` o `"strict"`), aplica la estrategia elegida antes de llamar al backend y expone:
    - `form`, `errors`, `isSubmitting`, `lastReserva`, `setLastReserva`
    - `handleChange`, `handleSubmit`
- `frontend/src/App.tsx`  
  - Usa `useReservaForm({ strategy: "strict" })` para la pantalla principal.

**Ruta en el código:** el componente `App` solo conoce el hook, no los detalles de validación interna.


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

