Sistema de Reservas de Canchas – Backend

Descripción general

Este proyecto implementa un sistema backend para la gestión de reservas de canchas deportivas. Se desarrolló utilizando Node.js y TypeScript, aplicando una arquitectura modular por capas inspirada en Clean Architecture, principios SOLID y patrones de diseño profesionales.

El sistema permite:
	•	Gestión completa de canchas (creación, consulta, actualización y eliminación).
	•	Creación y administración de reservas.
	•	Validación de disponibilidad y detección de solapamientos.
	•	Validación de fecha, horarios y estado de la cancha.
	•	Pagos simulados mediante un proveedor externo (Adapter Pattern).
	•	Cancelación de reservas con reglas de negocio asociadas.

⸻

Tecnologías utilizadas
	•	Node.js
	•	TypeScript
	•	Express
	•	Arquitectura por capas
	•	Repositorios InMemory
	•	Patrones de diseño (Repository, Adapter, Domain Model)

⸻

Arquitectura del sistema

El sistema se organiza en las siguientes capas:
Domain
Repository
Service
Controller
Routes
Infrastructure

Domain Layer

Incluye las entidades Reserva y Cancha, junto con su lógica interna y reglas de negocio.

Repository Layer

Contiene interfaces (ICanchasRepository, IReservasRepository) y sus implementaciones InMemory.

Service Layer

Contiene la lógica de negocio: validaciones, disponibilidad, reservas, pagos, cancelación y actualizaciones.

Controller Layer

Recibe solicitudes HTTP, ejecuta servicios y gestiona respuestas.

Routes Layer

Define los endpoints del sistema.

Infrastructure Layer

Contiene implementaciones externas como FakePaymentGateway, aplicando el patrón Adapter.

La documentación detallada se encuentra en:
/docs/arquitectura.md

⸻

Patrones de diseño aplicados
	•	Repository Pattern
	•	Adapter Pattern (para el sistema de pagos)
	•	Dependency Injection
	•	Domain Model
	•	Principios SOLID

Explicación completa:
/docs/decisiones-tecnicas.md

⸻

Modelos principales

Cancha
	•	Identificador
	•	Nombre
	•	Precio por hora
	•	Estado (activa/inactiva)
	•	Reglas para actualización y activación

Reserva
	•	Identificador
	•	Usuario
	•	Cancha
	•	Fecha
	•	Hora de inicio y fin
	•	Estado (pendiente, pagada, cancelada)
	•	Reglas: pagar, cancelar, evitar inconsistencias

⸻

Endpoints principales

Canchas

Crear cancha

POST /canchas

Obtener todas las canchas

GET /canchas

Obtener cancha por ID

GET /canchas/:id

Actualizar cancha

PUT /canchas/:id

Eliminar cancha

DELETE /canchas/:id

⸻

Reservas

Crear reserva

POST /reservas

Validaciones aplicadas:
	•	Fecha futura
	•	Horarios correctos
	•	Cancha existente y activa
	•	No solapamiento

Consultar disponibilidad

GET /reservas/disponibilidad/check

Obtener reserva por ID

GET /reservas/:id

Cancelar reserva

POST /reservas/:id/cancelar

Pagar reserva

POST /reservas/:id/pagar

Reglas:
	•	No se puede pagar dos veces
	•	No se puede pagar una reserva cancelada
	•	El estado cambia a “pagada”

⸻

Trazabilidad HU → Endpoints (resumen)
| HU | Funcionalidad | Endpoint |
|----|---------------|----------|
| HU-01 | Consultar disponibilidad | `GET /reservas/disponibilidad/check` |
| HU-02 | Validar solapamiento | `GET /reservas/disponibilidad/check` |
| HU-03 | Crear reserva | `POST /reservas` |
| HU-04 | Consultar reserva por ID | `GET /reservas/:id` |
| HU-05 | Pago de reserva | `POST /reservas/:id/pagar` |
| HU-06 | Cancelar reserva | `POST /reservas/:id/cancelar` |
| HU-07 | CRUD de canchas | `POST /canchas`, `GET /canchas`, `GET /canchas/:id`, `PUT /canchas/:id`, `DELETE /canchas/:id` |
| HU-08 | Validar cancha existente | `POST /reservas` |
| HU-09 | Validar horarios | `POST /reservas` |
| HU-10 | Validar fecha futura | `POST /reservas` |
| HU-11 | Validar cancha activa | `POST /reservas` |

Documentación completa:
/docs/trazabilidad.md

⸻

Pruebas funcionales

El sistema fue probado con Thunder Client, verificando:
	•	Validaciones de horarios
	•	Validación de disponibilidad
	•	Fecha futura
	•	Cancha activa
	•	Pago y bloqueo de doble pago
	•	Cancelación y bloqueo de doble cancelación
	•	Manejo correcto de estados

Todas las pruebas fueron superadas exitosamente.

Detalles completos:
/docs/pruebas.md

⸻

Diagramas C4

El repositorio incluye documentación visual en formato C4:
	•	Nivel 1: Contexto
	•	Nivel 2: Contenedores
	•	Nivel 3: Componentes internos

Archivo:
/docs/diagramas.md

⸻

Ejecución del proyecto

Instalación de dependencias
npm install

Ejecutar en modo desarrollo
npm run dev

Servidor disponible en:
http://localhost:4000

⸻

Estructura del proyecto
backend/
  src/
    domain/
    repositories/
    services/
    controllers/
    routes/
    infrastructure/
    app.ts
  docs/
    arquitectura.md
    trazabilidad.md
    pruebas.md
    decisiones-tecnicas.md
    diagramas.md
  README.md
  tsconfig.json
  package.json

  ⸻

  Conclusión

El sistema implementa de forma completa la gestión de canchas y reservas, con reglas de negocio correctamente encapsuladas, arquitectura modular y documentación exhaustiva.
La estructura permite ampliaciones futuras como integración con bases de datos reales, proveedores de pago externos o clientes web/móviles.