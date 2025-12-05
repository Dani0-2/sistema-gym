Decisiones Técnicas del Sistema de Reservas de Canchas

Este documento describe y justifica las decisiones técnicas tomadas durante el desarrollo del sistema backend. Cada elección se fundamenta en principios de ingeniería de software, mantenibilidad, escalabilidad y claridad arquitectónica.

⸻

1. Lenguaje y Entorno de Ejecución

Decisión:

Utilizar Node.js con TypeScript.

Justificación:
	•	TypeScript ofrece tipado estático que facilita detección temprana de errores.
	•	Permite modelar entidades, interfaces y servicios con mayor robustez.
	•	Node.js es adecuado para construir APIs REST livianas y de alto rendimiento.
	•	Ecosistema amplio y bien documentado.

⸻

2. Arquitectura por Capas (Clean Architecture Inspired)

Decisión:

Separar el sistema en capas: Domain, Repository, Service, Controller, Routes.

Justificación:
	•	Promueve separación de responsabilidades.
	•	Reduce acoplamiento entre lógica de negocio, transporte HTTP y persistencia.
	•	Facilita pruebas unitarias.
	•	Permite reemplazar infraestructura sin reescribir lógica de negocio.

⸻

3. Domain Model para Entidades

Decisión:

Implementar entidades como objetos ricos (Reserva, Cancha) con métodos que representan reglas del negocio.

Justificación:
	•	Encapsula comportamiento dentro de las entidades.
	•	Evita duplicar lógica en controladores o servicios.
	•	Permite aplicar patrones de diseño orientados a dominio.
	•	Facilita consistencia en operaciones críticas (pagar, cancelar, actualizar).

⸻

4. Patrón Repository

Decisión:

Utilizar interfaces ICanchasRepository y IReservasRepository para abstraer persistencia.

Justificación:
	•	Permite intercambiar la implementación InMemory por una base de datos real sin modificar los servicios.
	•	Facilita pruebas al permitir usar repositorios falsos o simulados.
	•	Mantiene los servicios independientes de detalles de almacenamiento.

⸻

5. Persistencia InMemory

Decisión:

Implementar repositorios en memoria (InMemoryRepository) en lugar de una base de datos.

Justificación:
	•	Suficiente para un proyecto académico.
	•	Reduce complejidad y acelera el desarrollo.
	•	Permite ejecutar pruebas sin necesidad de configurar infraestructura adicional.
	•	Interfaz lista para migrar a MongoDB, PostgreSQL u otra BD real en el futuro.

⸻

6. Validaciones en ReservasService

Decisión:

Realizar validaciones estrictas en ReservasService.crearReserva():
	•	Fecha futura
	•	Horarios válidos
	•	Cancha existente y activa
	•	No traslape de horarios
	•	Estructura mínima del DTO recibido

Justificación:
	•	La capa de servicio es el lugar adecuado para la lógica de negocio.
	•	Garantiza integridad del sistema sin depender de la capa HTTP.
	•	Permite reusabilidad en otros puntos del sistema (por ejemplo, una CLI o un microservicio).

⸻

7. Conversión de horas a minutos

Decisión:

Crear función horaToMinutos() para comparar rangos horarios.

Justificación:
	•	Evita errores al comparar strings.
	•	Permite validar solapamientos con precisión.
	•	Código más claro y reutilizable.

⸻

8. Patrón Adapter para Pagos

Decisión:

Implementar una interfaz IPaymentGateway y una clase concreta FakePaymentGateway.

Justificación:
	•	Mantiene al sistema independiente de proveedores reales.
	•	Permite sustituir por Stripe, PayPal o cualquier otro servicio sin cambiar la lógica del dominio.
	•	Simplifica pruebas al tener un gateway controlado.

⸻

9. Control de Estados de Reserva

Decisión:

Estados permitidos: pendiente, pagada, cancelada.
Reglas implementadas dentro de Reserva:
	•	Una reserva no puede pagarse dos veces.
	•	Una reserva cancelada no se puede pagar.
	•	Una reserva pagada no puede cancelarse.

Justificación:
	•	La entidad Reserva es el lugar adecuado para proteger la invariancia del dominio.
	•	Evita inconsistencias si se llama la lógica desde múltiples servicios o controladores.
	•	Refuerza encapsulamiento.

⸻

10. Manejo de errores

Decisión:

Lanzar errores explícitos desde los servicios y dejar que los controladores formen la respuesta HTTP adecuada.

Justificación:
	•	Separación clara entre lógica de negocio y presentación (HTTP).
	•	Facilita pruebas unitarias en servicios sin necesidad de Express.
	•	Reduce duplicación de lógica.

⸻

11. Uso de UUID para identificadores

Decisión:

Generar IDs de reservas y canchas usando crypto.randomUUID().

Justificación:
	•	Evita colisiones.
	•	Adecuado para sistemas distribuidos.
	•	No requiere un motor de base de datos con autoincremento.

⸻

12. Rutas simples y explícitas

Decisión:

Definir rutas REST claras:
	•	/canchas
	•	/reservas
	•	Subrutas: /pagar, /cancelar, /disponibilidad/check

Justificación:
	•	Cohesión con buenas prácticas REST.
	•	Claridad para cliente o frontend.
	•	Fácil mantenimiento.

⸻

13. Uso de TypeScript en toda la estructura

Decisión:

Aplicar tipado estricto en:
	•	DTOs
	•	Entidades
	•	Repositorios
	•	Servicios
	•	Controladores

Justificación:
	•	Reduce errores.
	•	Documenta la intención del código.
	•	Facilita refactorizaciones posteriores.

⸻

Conclusión

Las decisiones técnicas aplicadas en este proyecto permiten contar con un sistema robusto, modular, escalable y alineado con principios de ingeniería de software.
La estructura favorece la mantenibilidad y facilita futuras migraciones hacia tecnologías más avanzadas (bases de datos reales, proveedores de pago, despliegues en la nube).