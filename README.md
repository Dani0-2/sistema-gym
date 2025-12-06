# Sistema de Reservas de Canchas – Backend

## Descripción general

Este proyecto implementa un backend para gestionar reservas de canchas deportivas.  
Fue construido con Node.js + TypeScript, siguiendo principios de Clean Architecture, SOLID y patrones profesionales.

El sistema permite:

- Gestión completa de canchas (crear, consultar, actualizar y eliminar).
- Creación y administración de reservas.
- Validación de disponibilidad y detección de solapamientos.
- Validación de fecha, horarios y estado de la cancha.
- Pagos simulados mediante un proveedor externo (Adapter Pattern).
- Cancelación de reservas con reglas de negocio.

---

## Tecnologías utilizadas

- Node.js  
- TypeScript  
- Express  
- Repositorios InMemory  
- Clean Architecture  
- Patrones: Repository, Adapter, Domain Model  

---

## Arquitectura del sistema

El sistema se organiza en capas:

### Domain Layer
Entidades ricas con reglas de negocio (Reserva, Cancha).

### Repository Layer
Interfaces + implementaciones InMemory.

### Service Layer
Reglas de negocio: validaciones, disponibilidad, pagos, cancelación.

### Controller Layer
Controladores Express.

### Routes Layer
Definición de endpoints REST.

### Infrastructure Layer
Implementaciones externas (FakePaymentGateway).

Documentación completa en: docs/arquitectura.md

---

## Patrones de diseño y SOLID

Archivos dedicados:

- SOLID.md  
- PATTERNS.md  

Patrones aplicados:

- Repository Pattern  
- Adapter Pattern  
- Domain Model  
- Dependency Injection  
- Strategy (frontend)  
- Adapter (frontend API)

---

## Modelos principales

### Cancha
- id  
- nombre  
- precio por hora  
- activa/inactiva  

### Reserva
- id  
- usuario  
- cancha  
- fecha  
- horaInicio / horaFin  
- estado (pendiente, pagada, cancelada)

---

## Endpoints principales

### Canchas
- POST /canchas  
- GET /canchas  
- GET /canchas/:id  
- PUT /canchas/:id  
- DELETE /canchas/:id  

### Reservas
- POST /reservas  
- GET /reservas/disponibilidad/check  
- GET /reservas/:id  
- POST /reservas/:id/cancelar  
- POST /reservas/:id/pagar  

---

## Trazabilidad HU → Endpoints

| HU | Funcionalidad | Endpoint |
|----|---------------|----------|
| HU-01 | Consultar disponibilidad | GET /reservas/disponibilidad/check |
| HU-02 | Validar solapamiento | GET /reservas/disponibilidad/check |
| HU-03 | Crear reserva | POST /reservas |
| HU-04 | Consultar reserva por ID | GET /reservas/:id |
| HU-05 | Pago de reserva | POST /reservas/:id/pagar |
| HU-06 | Cancelar reserva | POST /reservas/:id/cancelar |
| HU-07 | CRUD de canchas | varios |
| HU-08 | Validar cancha existente | POST /reservas |
| HU-09 | Validar horarios | POST /reservas |
| HU-10 | Validar fecha futura | POST /reservas |
| HU-11 | Validar cancha activa | POST /reservas |

---

## Pruebas funcionales

Probado con Thunder Client:

- Validación de horarios  
- Disponibilidad  
- Fecha futura  
- Pago y doble pago  
- Cancelación  
- Estados correctos  

Documentación en: docs/pruebas.md

---

## Diagramas C4

Incluye:

- Nivel 1 – Contexto  
- Nivel 2 – Contenedores  
- Nivel 3 – Componentes  

Archivo: docs/diagramas.md

---

## Ejecución del proyecto

### Instalar dependencias
npm install

### Modo desarrollo
npm run dev

Servidor en:  
http://localhost:4000

### Variables de entorno
Crear archivo `.env` con:

PORT=4000

---

# Frontend (React)

El proyecto incluye un frontend en React + Vite que consume el backend.

### Ejecución del frontend:
cd frontend  
npm install  
npm run dev  

### Funcionalidades del frontend

- Crear canchas (nombre + precio por hora)
- Listar canchas y seleccionarlas desde un select
- Crear reservas indicando:
  - cancha  
  - usuario  
  - fecha  
  - horaInicio y horaFin
- Pagar reserva  
- Cancelar reserva  

### Patrones aplicados en frontend

- Adapter Pattern (apiClient, reservasApi, canchasApi)
- Strategy Pattern (useReservaForm + estrategias de validación)

---

## Conclusión

El sistema implementa completamente la gestión de canchas y reservas, con reglas de negocio encapsuladas, arquitectura modular, frontend funcional y documentación exhaustiva.  
La estructura permite escalar e integrar bases de datos, proveedores reales o aplicaciones móviles.