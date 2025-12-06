# Pruebas Funcionales del Sistema de Reservas de Canchas

Este documento describe las pruebas realizadas al sistema backend, los escenarios verificados y los resultados obtenidos.  
Cada prueba está alineada con los requerimientos funcionales y las reglas de negocio del proyecto.

---

## 1. Pruebas sobre Canchas

### Prueba 1A – Crear cancha válida
- **Request:** `POST /canchas`
- **Resultado esperado:** `201 Created`
- **Resultado obtenido:** Exitoso
- **Notas:** La cancha se creó correctamente y se almacenó en el repositorio InMemory.

---

### Prueba 1B – Crear reserva con cancha inexistente
- **Request:** `POST /reservas`
- **Resultado esperado:** `{ "error": "La cancha no existe" }`
- **Resultado obtenido:** Exitoso
- **Notas:** Validación correcta al verificar existencia de cancha antes de crear reserva.

---

## 2. Pruebas de Horarios y Validaciones

### Prueba 2A – Horario válido
- **Request:** `POST /reservas`
- **Horario:** inicio < fin
- **Resultado esperado:** `201 Created`
- **Resultado obtenido:** Exitoso

---

### Prueba 2B – Mismo horario (0 minutos)
- **Request:** `POST /reservas`
- **Horario:** inicio = fin
- **Resultado esperado:** Error (horario inválido)
- **Resultado inicial:** Se creaba la reserva incorrectamente.
- **Resultado final:** Después de la corrección, devuelve error como corresponde.

---

### Prueba 2C – horaInicio > horaFin
- **Request:** `POST /reservas`
- **Resultado esperado:** Error
- **Resultado inicial:** Se permitía.
- **Resultado final:** Validación agregada; ahora devuelve error correctamente.

---

## 3. Validaciones adicionales

### Validación de fecha futura
- **Request:** `POST /reservas` con fecha pasada
- **Resultado esperado:** `"La fecha de la reserva debe ser futura"`
- **Resultado inicial:** Permitía la reserva.
- **Resultado final:** Validación corregida y funcionando.

---

### Validación de disponibilidad (solapamientos)
- **Request:** `GET /reservas/disponibilidad/check`
- **Resultado esperado:** `{ "disponible": false }` cuando existe conflicto
- **Resultado inicial:** Incorrecto por comparación errónea.
- **Resultado final:** Corregido usando conversión de hora a minutos.

---

## 4. Pruebas de Pago

### Prueba 5A – Pagar reserva pendiente
- **Request:** `POST /reservas/:id/pagar`
- **Resultado esperado:** Estado cambia a `"pagada"`
- **Resultado obtenido:** Exitoso

---

### Prueba 5B – Pagar dos veces la misma reserva
- **Request:** `POST /reservas/:id/pagar`
- **Resultado esperado:** Error `"La reserva ya está pagada"`
- **Resultado obtenido:** Correcto

---

### Prueba 5C – Pagar reserva cancelada
- **Request:**  
  - `POST /reservas/:id/cancelar`  
  - Luego `POST /reservas/:id/pagar`
- **Resultado esperado:** `"La reserva está cancelada"`
- **Resultado obtenido:** Correcto

---

## 5. Pruebas de Cancelación

### Prueba 6A – Cancelar reserva pendiente
- **Request:** `POST /reservas/:id/cancelar`
- **Resultado esperado:** Estado `"cancelada"`
- **Resultado obtenido:** Correcto

---

### Prueba 6B – Cancelar dos veces la misma reserva
- **Request:** `POST /reservas/:id/cancelar` nuevamente
- **Resultado esperado:** Error `"La reserva ya está cancelada"`
- **Resultado obtenido:** Correcto

---

## 6. Resumen por categoría

| Categoría                     | Resultado |
|------------------------------|-----------|
| Validación de horarios       | ✔ Corregido y funcional |
| Validación de fecha futura   | ✔ Corregido y funcional |
| Validación de cancha         | ✔ Correcta (existencia + activa) |
| Validación de disponibilidad | ✔ Funcionando después de ajustar comparaciones |
| Pago de reservas             | ✔ Control correcto de estados |
| Cancelación                  | ✔ Control correcto de estados |
| CRUD de canchas              | ✔ Completamente funcional |

---

## 7. Conclusión

Las pruebas funcionales iniciales revelaron errores relacionados con:

- Validación de horarios
- Validación de fechas pasadas
- Manejo de estados (pagada/cancelada)
- Validación de disponibilidad
- Validación de cancha existente

Tras implementar las correcciones necesarias en los servicios y entidades,  
**todas las pruebas fueron nuevamente ejecutadas, obteniendo los resultados esperados.**

El sistema se considera **estable, funcional y alineado con los requerimientos establecidos**.