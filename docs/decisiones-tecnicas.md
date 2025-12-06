# Decisiones Técnicas del Sistema de Reservas de Canchas

Este documento describe y justifica las decisiones técnicas tomadas durante el desarrollo del backend del Sistema de Reservas de Canchas. Todas las decisiones están fundamentadas en principios de ingeniería de software, mantenibilidad, escalabilidad y claridad arquitectónica.

---

## 1. Lenguaje y Entorno de Ejecución

**Decisión:** usar Node.js con TypeScript.

**Justificación:**
- TypeScript aporta tipado estático que reduce errores en tiempo de desarrollo.
- Permite modelar entidades, interfaces y servicios con mayor robustez.
- Node.js es ideal para APIs REST livianas, escalables y fáciles de desplegar.
- Metodologías, documentación y paquetes ampliamente disponibles.

---

## 2. Arquitectura por Capas (inspirada en Clean Architecture)

**Decisión:** separar el sistema en capas: Domain, Repository, Service, Controller, Routes.

**Justificación:**
- Cumple separación de responsabilidades (SRP).
- Reduce el acoplamiento entre lógica de negocio, transporte HTTP y persistencia.
- Aumenta mantenibilidad y facilita pruebas unitarias.
- Permite sustituir infraestructura sin afectar la lógica de negocio.

---

## 3. Uso de Domain Model (Entidades Ricas)

**Decisión:** implementar entidades del dominio (Reserva, Cancha) con métodos propios.

**Justificación:**
- Centraliza reglas de negocio clave dentro de las entidades.
- Evita duplicación de lógica en controladores o servicios.
- Garantiza consistencia del dominio (estado, cambios, restricciones).
- Facilita mantenibilidad y robustez.

---

## 4. Patrón Repository

**Decisión:** usar interfaces (`ICanchasRepository`, `IReservasRepository`) para abstraer persistencia.

**Justificación:**
- Los servicios no dependen de cómo se almacena la información.
- Permite intercambiar fácilmente repositorios (InMemory, BD real, mocks).
- Facilita pruebas unitarias sin necesidad de infraestructura extra.

---

## 5. Persistencia InMemory

**Decisión:** Implementar repositorios en memoria.

**Justificación:**
- Ideal para un proyecto académico.
- Reduce tiempos de desarrollo y configuración.
- Facilita pruebas sin entorno externo.
- Arquitectura preparada para migrar a una base de datos real sin refactorización.

---

## 6. Validaciones en ReservasService

**Decisión:** reunir todas las validaciones de negocio en el servicio.

Incluyen:
- Fecha futura.
- Horarios válidos.
- Cancha existente.
- Cancha activa.
- No solapamiento de horarios.

**Justificación:**
- Las reglas de negocio deben estar centralizadas, no en rutas o controladores.
- Permite reutilización desde múltiples entradas (API, CLI, microservicios).
- Garantiza integridad del sistema.

---

## 7. Conversión de horas a minutos con horaToMinutos()

**Decisión:** crear una utilidad para comparar horas en formato HH:MM.

**Justificación:**
- Evita errores de comparación de strings.
- Permite validar solapamientos con precisión matemática.
- Hace más legible la lógica de negocio.

---

## 8. Patrón Adapter para Pagos

**Decisión:** implementar un gateway abstracto de pagos (`IPaymentGateway`) y uno simulado (`FakePaymentGateway`).

**Justificación:**
- El sistema queda desacoplado del proveedor de pagos real.
- Permite sustituir fácilmente por Stripe/PayPal sin modificar lógica del dominio.
- Facilita pruebas controladas.

---

## 9. Control de Estados de Reserva

**Decisión:** usar estados: pendiente, pagada, cancelada.

Reglas en la entidad:
- No pagar dos veces.
- No cancelar dos veces.
- No pagar reservas canceladas.
- No cancelar reservas ya pagadas.

**Justificación:**
- Mantener consistencia del dominio.
- Las reglas de estado deben estar en la entidad, no repartidas por el sistema.

---

## 10. Manejo de Errores

**Decisión:** lanzar errores desde servicios y capturarlos en los controladores.

**Justificación:**
- Controladores limpios y enfocados en HTTP.
- Servicios utilizables sin Express (por ejemplo en pruebas).
- Facilita manejo consistente de errores.

---

## 11. Uso de UUID como identificadores

**Decisión:** generar IDs mediante `crypto.randomUUID()`.

**Justificación:**
- Asegura unicidad sin necesidad de autoincremento.
- Compatible con entornos distribuidos.
- Recomendado para APIs modernas.

---

## 12. Diseño de Rutas REST

**Decisión:** mantener rutas simples y explícitas:

- /canchas
- /reservas
- /reservas/:id/pagar
- /reservas/:id/cancelar
- /reservas/disponibilidad/check

**Justificación:**
- Sigue buenas prácticas REST.
- Facilita integración con frontend y herramientas de prueba.
- Permite trazabilidad directa con las Historias de Usuario.

---

## 13. Uso Extensivo de TypeScript

**Decisión:** usar TS estricto en DTOs, entidades, servicios, repositorios y controllers.

**Justificación:**
- Reduce errores comunes.
- Documenta la intención del código.
- Mejora mantenibilidad y escalabilidad a largo plazo.

---

## 14. Patrones de Diseño en el Frontend (SPA React)

**Decisión:** usar dos patrones principales:

### a) Adapter para consumo de API  
Implementado en:
- apiClient.ts
- reservasApi.ts
- canchasApi.ts

**Justificación:**
- Desacopla React de fetch().
- Evita repetición de código.
- Provee un único punto de acceso al backend.

### b) Strategy para validación de reservas  
Implementado en:
- reservaValidationStrategies.ts
- useReservaForm.ts

**Justificación:**
- Permite cambiar la validación sin modificar el componente.
- Escalable a múltiples configuraciones de validación.
- Separa reglas de negocio de la UI.

---

## 15. Elección de InMemory en lugar de Base de Datos

**Decisión:** no usar BD real durante el desarrollo inicial.

**Justificación:**
- Ahorra tiempo de configuración, ideal para ambiente académico.
- Permite ejecutar todo sin dependencias externas.
- Mantiene el enfoque en arquitectura, SOLID y patrones.

---

## Conclusión

Las decisiones técnicas aplicadas garantizan que el sistema sea:

- Robusto en reglas de negocio  
- Modular y mantenible  
- Fácil de extender  
- Independiente de detalles de infraestructura  
- Ideal para evolucionar hacia un sistema profesional real  

La arquitectura favorece futuras integraciones como bases de datos reales, gateways de pago productivos y clientes web o móviles sin modificar la lógica central.