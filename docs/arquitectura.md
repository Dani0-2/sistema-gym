Arquitectura del Sistema de Reservas de Canchas

Introducción

Este documento describe la arquitectura interna del Sistema de Reservas de Canchas, desarrollado en Node.js y TypeScript bajo una estructura modular basada en capas, principios SOLID y patrones de diseño comunes en sistemas profesionales.

⸻

1. Arquitectura General

El backend sigue una arquitectura por capas inspirada en Clean Architecture:
Domain → Repository → Service → Controller → Routes → App (Express)
Cada capa es independiente, con responsabilidades bien definidas y sin dependencias hacia implementaciones concretas.

⸻

2. Domain Layer (Modelo de Dominio)

Contiene los modelos principales del sistema junto con sus reglas internas.

Reserva
	•	Representa una reserva de cancha realizada por un usuario.
	•	Métodos relevantes:
	•	marcarComoPagada()
	•	cancelar()
	•	Encapsula reglas como evitar pagar dos veces o cancelar una reserva ya cancelada.

Cancha
	•	Representa una cancha disponible en el sistema.
	•	Métodos relevantes:
	•	actualizarDatos()
	•	desactivar()
	•	Encapsula reglas como mantener consistencia en cambios de estado o precios.

La capa de dominio no depende de Express, HTTP, base de datos o detalles externos.

⸻

3. Repository Layer

Define interfaces de persistencia desacopladas de cualquier tecnología:
	•	ICanchasRepository
	•	IReservasRepository

Incluye implementaciones en memoria:
	•	CanchasInMemoryRepository
	•	ReservasInMemoryRepository

Estas implementaciones funcionan como almacenamiento temporal durante la ejecución, permitiendo reemplazar fácilmente por una base de datos real sin modificar el dominio ni los servicios.

⸻

4. Service Layer (Lógica de Negocio)

Contiene la lógica del sistema y las validaciones más importantes.

CanchasService
	•	Crear cancha.
	•	Listar, actualizar y eliminar canchas.
	•	Validar existencia de cancha antes de una reserva.

ReservasService

Responsable de:
	•	Crear reservas con validaciones:
	•	Fecha futura.
	•	Horarios válidos (horaInicio < horaFin).
	•	Cancha existente y activa.
	•	No solapamiento de horarios.
	•	Consultar disponibilidad.
	•	Cancelar reservas.
	•	Pagar reservas mediante un gateway externo.
	•	Obtener reserva por ID.

Los servicios no manejan HTTP y no dependen de Express.

⸻

5. Controller Layer

Incluye:
	•	ReservasController
	•	CanchasController

Funciones principales:
	•	Recibir solicitudes HTTP.
	•	Mapear datos de entrada hacia los servicios.
	•	Manejar errores y devolver respuestas JSON.
	•	Actuar como capa intermedia entre Routes y Services.

⸻

6. Routes Layer

Define los endpoints expuestos por el API.

Rutas principales:
	•	/canchas
	•	/reservas

Cada ruta está vinculada a su controlador correspondiente.

⸻

7. Infrastructure Layer (Adaptadores)

Contiene implementaciones externas como:

FakePaymentGateway
	•	Implementa la interfaz IPaymentGateway.
	•	Representa un proveedor de pagos externo simulado.
	•	Utiliza el patrón Adapter para permitir que la lógica de pagos permanezca desacoplada del proveedor real.

⸻

8. Patrones de Diseño Utilizados

Repository Pattern

Permite abstraer la persistencia y desacoplar la lógica de negocio de los detalles de almacenamiento.

Dependency Injection

Los servicios reciben repositorios y gateways a través del constructor.

Adapter Pattern

Aplicado en el sistema de pagos para aislar al sistema del proveedor externo.

Domain Model

Entidades con lógica propia que representan objetos reales del dominio.

Principios SOLID
	•	SRP: cada clase tiene una única responsabilidad.
	•	OCP: los servicios pueden extenderse sin modificarse directamente.
	•	LSP: repositorios intercambiables a través de interfaces.
	•	ISP: interfaces pequeñas y específicas.
	•	DIP: los servicios dependen de abstracciones y no implementaciones concretas.

⸻

9. Flujo de una petición

Ejemplo: Crear una reserva
	1.	POST /reservas (Routes)
	2.	ReservasController.crearReserva()
	3.	ReservasService.crearReserva()
	4.	Validación de negocio
	5.	ReservasInMemoryRepository.create()
	6.	Respuesta al cliente en formato JSON

⸻

10. Capacidad de expansión

La arquitectura permite:
	•	Reemplazar InMemory por una base de datos real sin modificar lógica.
	•	Cambiar FakePaymentGateway por Stripe u otro servicio real.
	•	Extender funcionalidades sin romper el código existente.
	•	Conectar un frontend móvil o web sin cambios en los servicios.

⸻

11. Conclusión

El sistema está diseñado siguiendo buenas prácticas de ingeniería de software, priorizando modularidad, mantenibilidad, escalabilidad y claridad arquitectónica. Esta estructura permite continuar desarrollando nuevas funcionalidades sin comprometer la estabilidad del proyecto.