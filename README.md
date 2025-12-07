# Sistema de Reservas de Canchas – Backend + Frontend

Este proyecto implementa un sistema completo para la gestión de reservas de canchas deportivas, compuesto por:

- Backend (Node.js + TypeScript)  
- Frontend (React + Vite)  
- Entorno Docker con backend + frontend ejecutándose automáticamente  

El sistema está construido con principios de Clean Architecture, SOLID y patrones de diseño tanto en backend como en frontend.

=====================================================================
# 🚀 Ejecución con Docker (Backend + Frontend)
=====================================================================

El proyecto incluye contenedores Docker para levantar todo el sistema sin necesidad de instalar Node.js localmente.

## ▶️ Levantar todo el sistema

docker compose up --build

Servicios levantados:

| Servicio    | URL                    |
|-------------|------------------------|
| Frontend    | http://localhost:5173 |
| Backend     | http://localhost:4000 |

## ⏹️ Detener servicios

docker compose down

## 🔄 Reconstruir imágenes

docker compose build --no-cache

=====================================================================
# ▶️ Ejecución sin Docker (Opcional)
=====================================================================

## Backend

cd backend
npm install
npm run dev

Backend disponible en:
http://localhost:4000

## Frontend

cd frontend
npm install
npm run dev

Frontend disponible en:
http://localhost:5173

=====================================================================
# 🧱 Arquitectura del Sistema
=====================================================================

El backend está organizado en capas siguiendo Clean Architecture:

Domain → Repository → Service → Controller → Routes → App

### Domain Layer
Modelos ricos (Reserva, Cancha) con reglas de negocio internas.

### Repository Layer
Interfaces + repositorios InMemory totalmente intercambiables con una base de datos real.

### Service Layer
Lógica del sistema:
- Validación de fechas y horarios  
- Prevención de solapamiento  
- Pago de reservas  
- Cancelación  
- Disponibilidad  

### Controller Layer
Manejan las peticiones HTTP y llaman a los servicios.

### Routes Layer
Define los endpoints REST.

### Infrastructure Layer
Implementación del Adapter Pattern:
- FakePaymentGateway

Documentación completa:
docs/arquitectura.md

=====================================================================
# 📐 Patrones de Diseño (Backend + Frontend)
=====================================================================

Documentados en:
- SOLID.md  
- PATTERNS.md  

### Patrones aplicados en backend:
- Repository Pattern  
- Adapter Pattern (pagos)  
- Domain Model  
- Dependency Injection  

### Patrones aplicados en frontend:
- Adapter Pattern (apiClient + módulos de API)  
- Strategy Pattern (validación de reservas con useReservaForm)

=====================================================================
# 📌 Modelos Principales
=====================================================================

### Cancha
- id  
- nombre  
- precioPorHora  
- activa  

### Reserva
- id  
- usuarioId  
- canchaId  
- fecha  
- horaInicio / horaFin  
- estado (pendiente, pagada, cancelada)  
- creadoEn  

=====================================================================
# 🌐 Endpoints Principales
=====================================================================

### Canchas
POST /canchas  
GET /canchas  
GET /canchas/:id  
PUT /canchas/:id  
DELETE /canchas/:id  

### Reservas
POST /reservas  
GET /reservas/disponibilidad/check  
GET /reservas/:id  
POST /reservas/:id/cancelar  
POST /reservas/:id/pagar  

=====================================================================
# 🔎 Trazabilidad HU → Endpoints
=====================================================================

| HU | Funcionalidad | Endpoint |
|----|---------------|----------|
| HU-01 | Consultar disponibilidad | GET /reservas/disponibilidad/check |
| HU-02 | Validar solapamiento | GET /reservas/disponibilidad/check |
| HU-03 | Crear reserva | POST /reservas |
| HU-04 | Consultar reserva | GET /reservas/:id |
| HU-05 | Pago | POST /reservas/:id/pagar |
| HU-06 | Cancelación | POST /reservas/:id/cancelar |
| HU-07 | CRUD Canchas | /canchas |
| HU-08 | Validar cancha | POST /reservas |
| HU-09 | Validar horarios | POST /reservas |
| HU-10 | Validar fecha | POST /reservas |
| HU-11 | Validar cancha activa | POST /reservas |

=====================================================================
# 🧪 Pruebas Funcionales
=====================================================================

Validado con Thunder Client:

- Validación de horarios  
- Fecha futura  
- Solapamiento  
- Doble pago evitado  
- Doble cancelación evitada  
- Estados correctos  
- CRUD de canchas  

Documentación completa:  
docs/pruebas.md

=====================================================================
# 📊 Diagramas C4
=====================================================================

Incluye:

- Nivel 1 (Contexto)  
- Nivel 2 (Contenedores)  
- Nivel 3 (Componentes)

Archivo:
docs/diagramas.md

=====================================================================
# 🎨 Frontend (React + Vite)
=====================================================================

El frontend permite:

- Crear canchas  
- Listarlas y seleccionarlas desde un <select>  
- Crear reservas  
- Ver estado de la última reserva  
- Pagar y cancelar reservas  
- Validación con Strategy Pattern  
- Consumo de API por Adapter Pattern  

Ejecución:
cd frontend  
npm install  
npm run dev

=====================================================================
# 📦 Conclusión
=====================================================================

El sistema implementa:

✔ Reserva y cancelación con reglas de negocio robustas  
✔ Arquitectura modular y escalable  
✔ Frontend funcional con validación extensible  
✔ Docker para despliegue inmediato  
✔ Documentación profesional (C4, pruebas, patrones, arquitectura)

La estructura permite extender fácilmente el proyecto hacia:

- Bases de datos reales  
- Pasarelas de pago auténticas  
- Aplicaciones móviles o web avanzadas  
- Microservicios  

=====================================================================
# Proyecto Final · Sistema de Reservas de Canchas
=====================================================================