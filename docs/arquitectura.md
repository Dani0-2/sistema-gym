# Arquitectura del Sistema de Reservas de Canchas

Este documento describe la arquitectura interna del Sistema de Reservas de Canchas, desarrollado en Node.js y TypeScript. El sistema utiliza una estructura modular en capas, principios SOLID y patrones de diseño propios de sistemas profesionales.

---

## 1. Arquitectura General

El backend implementa una arquitectura por capas inspirada en Clean Architecture:

Domain → Repository → Service → Controller → Routes → App (Express)

Cada capa tiene responsabilidades bien definidas y no depende de implementaciones concretas, lo que facilita mantenibilidad, extensibilidad y pruebas.

---

## 2. Domain Layer (Modelo de Dominio)

Incluye las entidades principales del sistema y las reglas de negocio que les pertenecen.

### Reserva
Representa una reserva realizada por un usuario.

Métodos principales:
- marcarComoPagada()
- cancelar()

Reglas encapsuladas:
- No permitir pagos duplicados.
- No permitir cancelar reservas ya canceladas.
- Control estricto del estado de la reserva.

### Cancha
Representa una cancha disponible para reservar.

Métodos principales:
- actualizarDatos()
- desactivar()

Reglas encapsuladas:
- Mantener consistencia en los cambios de estado.
- Controlar actualizaciones de datos como el precio.

> La capa Domain no depende de Express, HTTP, bases de datos ni infraestructura externa.

---

## 3. Repository Layer

Define **interfaces de persistencia** totalmente desacopladas de bases de datos concretas.

Interfaces:
- ICanchasRepository
- IReservasRepository

Implementaciones:
- CanchasInMemoryRepository
- ReservasInMemoryRepository

Ventajas:
- El almacenamiento se puede reemplazar fácilmente por PostgreSQL, MongoDB u otro sin modificar servicios ni dominio.

---

## 4. Service Layer (Lógica de Negocio)

Contiene las validaciones y reglas principales del sistema.

### CanchasService
Responsabilidades:
- Crear canchas.
- Listar, actualizar y eliminar canchas.
- Validar existencia de canchas antes de crear reservas.

### ReservasService
Responsabilidades:
- Crear reservas aplicando validaciones:
  - Fecha futura
  - Horario válido (inicio < fin)
  - Cancha existente
  - Cancha activa
  - No solapamiento
- Consultar disponibilidad.
- Cancelar reservas.
- Pagar reservas usando un gateway externo.
- Obtener reserva por ID.

> Los servicios no manejan HTTP ni dependen de Express; solo usan repositorios, entidades y adaptadores.

---

## 5. Controller Layer

Incluye:
- ReservasController
- CanchasController

Rol de los controladores:
- Recibir solicitudes HTTP.
- Validar datos básicos de entrada.
- Invocar el servicio correspondiente.
- Devolver respuestas JSON.
- Gestionar errores operacionales.

Sirven como intermediarios entre Routes y Services.

---

## 6. Routes Layer

Define los endpoints públicos del API:

- /canchas
- /reservas

Cada ruta está conectada a un método de su controlador correspondiente.

---

## 7. Infrastructure Layer (Adaptadores)

Incluye implementaciones externas necesarias para el sistema.

### FakePaymentGateway
- Implementa IPaymentGateway.
- Simula un proveedor de pagos real.
- Usa el Adapter Pattern para mantener la lógica de pagos independizada del proveedor.

Gracias a esta abstracción, cambiar a Stripe o PayPal solo requiere modificar esta implementación.

---

## 8. Patrones de Diseño Utilizados

### Repository Pattern
Desacopla la lógica de negocio del mecanismo de persistencia.

### Dependency Injection
Servicios reciben repositorios y gateways mediante constructores.

### Adapter Pattern
Usado en el sistema de pagos para desacoplar la lógica de negocio del proveedor externo.

### Domain Model
Entidades ricas con métodos y reglas encapsuladas.

### Principios SOLID
- SRP: cada clase cumple una sola responsabilidad.
- OCP: se pueden extender funcionalidades sin modificar código existente.
- LSP: repositorios intercambiables por usar interfaces.
- ISP: interfaces pequeñas y específicas.
- DIP: servicios dependen de abstracciones, no implementaciones concretas.

---

## 9. Flujo de una Petición

Ejemplo: Crear una reserva

1. POST /reservas (Routes)
2. ReservasController.crearReserva()
3. ReservasService.crearReserva()
4. Se ejecutan todas las validaciones de negocio
5. ReservasInMemoryRepository.create()
6. Respuesta JSON enviada al cliente

Este flujo refleja la separación clara de responsabilidades.

---

## 10. Capacidad de Expansión

La arquitectura permite:

- Reemplazar fácilmente el almacenamiento InMemory por una base de datos real.
- Sustituir el gateway de pagos por Stripe, PayPal u otro proveedor.
- Añadir nuevas reglas de negocio sin afectar servicios o controladores existentes.
- Conectar aplicaciones móviles o web sin cambiar la lógica backend.

---

## 11. Conclusión

El sistema está diseñado para ser modular, mantenible y escalable, siguiendo buenas prácticas de ingeniería de software. La separación de capas y el uso de patrones garantizan que el proyecto pueda crecer sin comprometer su estabilidad ni su claridad.