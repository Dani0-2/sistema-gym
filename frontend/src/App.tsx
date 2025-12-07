import { useEffect, useState } from "react";
import { useReservaForm } from "./hooks/useReservaForm";
import { crearCancha, listarCanchas } from "./services/canchasApi";
import { pagarReserva, cancelarReserva } from "./services/reservasApi";

import type { CanchaDTO } from "./services/canchasApi";
import "./App.css";

function App() {
  const [nombreCancha, setNombreCancha] = useState("");
  const [precioPorHora, setPrecioPorHora] = useState<number | "">("");
  const [canchas, setCanchas] = useState<CanchaDTO[]>([]);
  const [isCreatingCancha, setIsCreatingCancha] = useState(false);
  const [canchaError, setCanchaError] = useState<string | null>(null);

  const {
    form,
    errors,
    isSubmitting,
    lastReserva,
    setLastReserva,
    handleChange,
    handleSubmit,
  } = useReservaForm({ strategy: "strict" });


  useEffect(() => {
    (async () => {
      try {
        const data = await listarCanchas();
        setCanchas(data);
      } catch (err) {
        console.error(err);
        setCanchaError("No se pudieron cargar las canchas.");
      }
    })();
  }, []);

  const handleCrearCancha = async () => {
    setCanchaError(null);

    if (!nombreCancha || precioPorHora === "" || precioPorHora <= 0) {
      setCanchaError("Ingresa un nombre y un precio por hora válido.");
      return;
    }

    try {
      setIsCreatingCancha(true);
      const nueva = await crearCancha({
        nombre: nombreCancha,
        precioPorHora: Number(precioPorHora),
      });
      setCanchas((prev) => [...prev, nueva]);
      setNombreCancha("");
      setPrecioPorHora("");
    } catch (err) {
      console.error(err);
      setCanchaError("No se pudo crear la cancha.");
    } finally {
      setIsCreatingCancha(false);
    }
  };

  const handlePagarReserva = async () => {
    if (!lastReserva) return;
    try {
      const actualizada = await pagarReserva(lastReserva.id);
      setLastReserva(actualizada);
    } catch (err) {
      alert((err as Error).message);
    }
  };

  const handleCancelarReserva = async () => {
    if (!lastReserva) return;
    try {
      const actualizada = await cancelarReserva(lastReserva.id);
      setLastReserva(actualizada);
    } catch (err) {
      alert((err as Error).message);
    }
  };

  return (
    <div className="app-root">
      <header className="app-header">
        <h1>Sistema de Reservas de Canchas</h1>
        <p className="app-subtitle">
          Administra canchas, crea reservas y simula pagos desde una sola
          pantalla.
        </p>
      </header>

      <main className="app-main">
        {}
        <section className="app-column">
          {}
          <div className="card">
            <h2>Crear Cancha</h2>

            <div className="form-grid">
              <label className="form-field">
                <span>Nombre</span>
                <input
                  className="input"
                  value={nombreCancha}
                  onChange={(e) => setNombreCancha(e.target.value)}
                  placeholder="Ej. Cancha Sintética"
                />
              </label>

              <label className="form-field">
                <span>Precio por hora</span>
                <input
                  className="input"
                  type="number"
                  min={0}
                  value={precioPorHora}
                  onChange={(e) =>
                    setPrecioPorHora(
                      e.target.value === "" ? "" : Number(e.target.value)
                    )
                  }
                  placeholder="Ej. 300"
                />
              </label>
            </div>

            {canchaError && (
              <div className="alert alert-error">{canchaError}</div>
            )}

            <button
              className="btn btn-primary btn-full"
              onClick={handleCrearCancha}
              disabled={isCreatingCancha}
            >
              {isCreatingCancha ? "Creando cancha..." : "Crear cancha"}
            </button>

            {canchas.length > 0 && (
              <div className="chip-list">
                <span className="chip-label">Canchas creadas:</span>
                {canchas.map((c) => (
                  <span key={c.id} className="chip">
                    {c.nombre} · L.{c.precioPorHora}
                  </span>
                ))}
              </div>
            )}
          </div>

          {}
          <div className="card card-secondary">
            <h3>Cómo usar el sistema</h3>
            <ol className="steps">
              <li>Crea una o varias canchas con su precio por hora.</li>
              <li>
                En el formulario de reserva, selecciona una cancha de la lista.
              </li>
              <li>Indica usuario, fecha, hora de inicio y fin.</li>
              <li>Guarda la reserva y luego puedes pagarla o cancelarla.</li>
            </ol>
          </div>
        </section>

        {}
        <section className="app-column">
          {}
          <div className="card">
            <h2>Crear Reserva</h2>

            <div className="form-grid">
              <label className="form-field">
                <span>Cancha</span>
                <select
                  className="input"
                  value={form.canchaId}
                  onChange={(e) => handleChange("canchaId", e.target.value)}
                >
                  <option value="">Selecciona una cancha</option>
                  {canchas.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.nombre} · L.{c.precioPorHora}
                    </option>
                  ))}
                </select>
              </label>

              <label className="form-field">
                <span>Usuario ID</span>
                <input
                  className="input"
                  value={form.usuarioId}
                  onChange={(e) => handleChange("usuarioId", e.target.value)}
                  placeholder="Ej. USER-1"
                />
              </label>

              <label className="form-field">
                <span>Fecha (YYYY-MM-DD)</span>
                <input
                  className="input"
                  value={form.fecha}
                  onChange={(e) => handleChange("fecha", e.target.value)}
                  placeholder="2025-12-10"
                />
              </label>

              <label className="form-field">
                <span>Hora inicio (HH:MM)</span>
                <input
                  className="input"
                  value={form.horaInicio}
                  onChange={(e) =>
                    handleChange("horaInicio", e.target.value)
                  }
                  placeholder="08:00"
                />
              </label>

              <label className="form-field">
                <span>Hora fin (HH:MM)</span>
                <input
                  className="input"
                  value={form.horaFin}
                  onChange={(e) => handleChange("horaFin", e.target.value)}
                  placeholder="09:00"
                />
              </label>
            </div>

            {errors.length > 0 && (
              <div className="alert alert-error">
                <strong>Revisa los siguientes errores:</strong>
                <ul>
                  {errors.map((err, idx) => (
                    <li key={idx}>{err}</li>
                  ))}
                </ul>
              </div>
            )}

            <button
              className="btn btn-primary btn-full"
              onClick={handleSubmit}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Creando reserva..." : "Crear reserva"}
            </button>
          </div>

          {}
          {lastReserva && (
            <div className="card">
              <div className="card-header-row">
                <h2>Acciones de la reserva</h2>
                <span className={`status-badge status-${lastReserva.estado}`}>
                  {lastReserva.estado.toUpperCase()}
                </span>
              </div>

              <div className="button-row">
                <button
                  className="btn btn-outline"
                  onClick={handlePagarReserva}
                  disabled={lastReserva.estado !== "pendiente"}
                >
                  Pagar reserva
                </button>

                <button
                  className="btn btn-outline btn-danger"
                  onClick={handleCancelarReserva}
                  disabled={lastReserva.estado !== "pendiente"}
                >
                  Cancelar reserva
                </button>
              </div>

              <pre className="json-viewer">
                {JSON.stringify(lastReserva, null, 2)}
              </pre>
            </div>
          )}
        </section>
      </main>

      <footer className="app-footer">
        <span>Proyecto Final · Sistema de Reservas de Canchas</span>
      </footer>
    </div>
  );
}

export default App;