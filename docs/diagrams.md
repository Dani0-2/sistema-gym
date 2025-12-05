\```mermaid
C4Context
    title Sistema de Reservas de Canchas - C4 Nivel 1 (Contexto)

    Person(usuario, "Usuario", "Persona que reserva canchas y gestiona sus reservas")

    System(sistema, "Sistema de Reservas de Canchas", "Backend que gestiona canchas, reservas, pagos y disponibilidad")

    System_Ext(proveedorPagos, "Proveedor de Pagos (FakePaymentGateway)", "Sistema externo simulado para procesar pagos")

    Rel(usuario, sistema, "Realiza reservas, consulta disponibilidad, paga y cancela")
    Rel(sistema, proveedorPagos, "Envía solicitudes de cobro por reserva")
\```

\```mermaid
C4Container
    title Sistema de Reservas de Canchas - C4 Nivel 2 (Contenedores)

    Person(usuario, "Usuario", "Persona que usa el sistema")

    Container(api, "API REST (Express + Node.js)", "TypeScript", "Expone endpoints para gestionar canchas y reservas")

    ContainerDb(repos, "Repositorios InMemory", "Memory Database", "Almacena canchas y reservas temporalmente durante la ejecución")

    Container(pagos, "Fake Payment Gateway", "Adapter", "Simula un proveedor externo de pagos")

    Rel(usuario, api, "Consume API via HTTP/JSON")
    Rel(api, repos, "Lee/escribe canchas y reservas")
    Rel(api, pagos, "Solicita cobros")
\```

\```mermaid
C4Component
    title Sistema de Reservas de Canchas - C4 Nivel 3 (Componentes Backend)

    Container(api, "API REST", "Express.js")

    Component(controllerCanchas, "CanchasController", "Controlador", "Maneja HTTP para canchas")
    Component(controllerReservas, "ReservasController", "Controlador", "Maneja HTTP para reservas")

    Component(serviceCanchas, "CanchasService", "Servicio", "Lógica de negocio para canchas")
    Component(serviceReservas, "ReservasService", "Servicio", "Lógica de negocio para reservas: validaciones, disponibilidad, pago, cancelación")

    Component(repoCanchas, "CanchasInMemoryRepository", "Repositorio", "Almacena canchas en memoria")
    Component(repoReservas, "ReservasInMemoryRepository", "Repositorio", "Almacena reservas en memoria")

    Component(entityReserva, "Reserva", "Entidad", "Propiedades y reglas de negocio (cancelar, pagar)")
    Component(entityCancha, "Cancha", "Entidad", "Propiedades y reglas de negocio (activar, desactivar, actualizar)")

    Component(adapterPago, "FakePaymentGateway", "Adapter", "Simula un proveedor externo de pagos")

    Rel(api, controllerCanchas, "Llama")
    Rel(api, controllerReservas, "Llama")

    Rel(controllerCanchas, serviceCanchas, "Utiliza")
    Rel(controllerReservas, serviceReservas, "Utiliza")

    Rel(serviceCanchas, repoCanchas, "Consulta/Modifica")
    Rel(serviceReservas, repoReservas, "Consulta/Modifica")
    Rel(serviceReservas, repoCanchas, "Valida cancha existente")
    Rel(serviceReservas, adapterPago, "Solicita pago")

    Rel(repoCanchas, entityCancha, "Almacena instancias de")
    Rel(repoReservas, entityReserva, "Almacena instancias de")
\```