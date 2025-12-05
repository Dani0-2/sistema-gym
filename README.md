README – Sistema de Reservas de Canchas (Backend)

Descripción del proyecto
Este proyecto implementa un backend para un Sistema de Reservas de Canchas Deportivas, desarrollado en Node.js + TypeScript siguiendo una arquitectura limpia por capas.

El sistema permite:
	•	Gestión de canchas (CRUD completo).
	•	Gestión de reservas:
	•	Crear reserva
	•	Validar disponibilidad
	•	Validaciones de reglas de negocio (fechas, horarios, cancha activa)
	•	Cancelar reserva
	•	Pagar reserva (implementado con patrón Adapter simulando un proveedor de pagos externo)

Este backend fue desarrollado como parte del Proyecto Final de Ingeniería de Software, aplicando principios SOLID, separación de responsabilidades y patrones de diseño.



Arquitectura
La arquitectura se basa en:

Domain Layer
Contiene las entidades principales (Reserva, Cancha) y sus reglas internas.

Repository Layer
Define interfaces para el acceso a datos (ICanchasRepository, IReservasRepository) e implementaciones InMemory.

Service Layer
Contiene la lógica de negocio: validaciones, disponibilidad, pago (Adapter), cancelación, etc.

Controller Layer
Recibe las peticiones HTTP, llama a los Services y maneja respuestas/errores.

Routes Layer
Define los endpoints expuestos por el API.

Infrastructure Layer
Implementación del proveedor de pagos usando un Adapter (FakePaymentGateway).



Estructura de carpetas
backend/
  src/
    domain/
      Cancha.ts
      Reserva.ts
    repositories/
      InMemoryRepos.ts
      ICanchasRepository.ts
      IReservasRepository.ts
      CanchasInMemoryRepository.ts
      ReservasInMemoryRepository.ts
    services/
      CanchasService.ts
      ReservasService.ts
    controllers/
      CanchasController.ts
      ReservasController.ts
    infrastructure/
      payments/
        IPaymentGateway.ts
        FakePaymentGateway.ts
    routes/
      canchasRoutes.ts
      reservasRoutes.ts
    app.ts
  package.json
  tsconfig.json
  README.md



Patrones de diseño aplicados
Repository Pattern
Para desacoplar el acceso a datos y permitir reemplazar InMemory por BD real.

Dependency Injection
Los services reciben repositorios y el payment gateway vía constructor.

Adapter Pattern
Para el procesamiento de pagos (IPaymentGateway + FakePaymentGateway).

Domain Model
Entidades (Cancha, Reserva) encapsulan reglas como:
	•	marcarComoPagada()
	•	cancelar()
	•	actualizarDatos()

Principios SOLID
	•	SRP: cada clase tiene una responsabilidad clara.
	•	OCP: se puede cambiar el proveedor de pagos sin modificar el servicio.
	•	LSP: repositorios siguen contratos consistentes.
	•	ISP: interfaces pequeñas y específicas.
	•	DIP: servicios dependen de abstracciones, no implementaciones.



Documentación de Endpoints
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



Reservas
Crear reserva
POST /reservas
Body:
  {
  "canchaId": "string",
  "usuarioId": "string",
  "fecha": "YYYY-MM-DD",
  "horaInicio": "HH:MM",
  "horaFin": "HH:MM"
  }
  
Validaciones:
	•	La cancha debe existir y estar activa
	•	La fecha debe ser futura
	•	horaInicio < horaFin
	•	No se permiten reservas de 0 minutos
	•	No deben solaparse con reservas existentes

Consultar disponibilidad
GET /reservas/disponibilidad/check?canchaId=XX&fecha=2025-12-10&horaInicio=08:00&horaFin=09:00

Obtener reserva por ID
GET /reservas/:id

Cancelar reserva
POST /reservas/:id/cancelar

Pagar reserva
POST /reservas/:id/pagar

Reglas:
	•	No se puede pagar dos veces
	•	No se puede pagar una reserva cancelada
	•	Cambia estado a "pagada"



Trazabilidad HU -> Endpoints
1.Historia de Usuario
2.Descripción
3.Endpoint
4.Lógica involucrada

1.HU-01
2.Ver disponibilidad
3.GET /reservas/disponibilidad/check
4.ReservasService.verificarDisponibilidad

1.HU-02
2.Verificar solapamiento
3.GET /reservas/disponibilidad/check
4.horaToMinutos(), comparación de rangos

1.HU-03
2.Crear reserva
3.POST /reservas
4.ReservasService.crearReserva

1.HU-04
2.Ver reserva
3.GET /reservas/:id
4.ReservasService.obtenerReservaPorId

1.HU-05
2.Pagar reserva
3.POST /reservas/:id/pagar
4.Adapter + marcarComoPagada()

1.HU-06
2.Cancelar reserva
3.POST /reservas/:id/cancelar
4.cancelar(), update()

1.HU-07
2.Administrar canchas
3.CRUD /canchas
4.CanchasService + Controller



Como correr el proyecto
  npm install
  npm run dev

El servidor corre en:
  http://localhost:4000  
