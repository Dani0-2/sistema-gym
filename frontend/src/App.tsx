// frontend/src/App.tsx
import { useEffect, useState } from "react";
import { useReservaForm } from "./hooks/useReservaForm";
import { pagarReserva, cancelarReserva } from "./services/reservasApi";
import {
  listarCanchas,
  crearCancha,
  type CanchaDTO,
} from "./services/canchasApi";

function App() {
  const {
    form,
    errors,
    isSubmitting,
    lastReserva,
    setLastReserva,
    handleChange,
    handleSubmit,
  } = useReservaForm({ strategy: "strict" });

  const [canchas, setCanchas] = useState<CanchaDTO[]>([]);
  const [nuevaCanchaNombre, setNuevaCanchaNombre] = useState("");
  const [nuevaCanchaPrecio, setNuevaCanchaPrecio] = useState("300");

  // Cargar canchas existentes al inicio
  useEffect(() => {
    listarCanchas()
      .then(setCanchas)
      .catch((err) => {
        console.error("Error al listar canchas", err);
      });
  }, []);

  async function handleCrearCancha() {
    if (!nuevaCanchaNombre.trim()) {
      alert("El nombre de la cancha es obligatorio");
      return;
    }

    const precio = Number(nuevaCanchaPrecio);
    if (Number.isNaN(precio) || precio <= 0) {
      alert("El precio debe ser un número mayor que 0");
      return;
    }

    try {
      const cancha = await crearCancha({
        nombre: nuevaCanchaNombre,
        precioPorHora: precio,
      });

      // agregar a la lista
      setCanchas((prev) => [...prev, cancha]);

      // seleccionar automáticamente en el formulario de reserva
      handleChange("canchaId", cancha.props.id);

      setNuevaCanchaNombre("");
      // dejamos el precio igual para crear varias canchas similares si se quiere
    } catch (err) {
      alert((err as Error).message || "Error al crear cancha");
    }
  }

  return (
    <div style={{ maxWidth: 600, margin: "0 auto", padding: 16 }}>
      <h1>Sistema de Reservas de Canchas</h1>

      {/* ----- Crear cancha ----- */}
      <section style={{ marginTop: 24, marginBottom: 24 }}>
        <h2>Crear Cancha</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <label>
            Nombre
            <input
              value={nuevaCanchaNombre}
              onChange={(e) => setNuevaCanchaNombre(e.target.value)}
            />
          </label>

          <label>
            Precio por hora
            <input
              type="number"
              value={nuevaCanchaPrecio}
              onChange={(e) => setNuevaCanchaPrecio(e.target.value)}
            />
          </label>

          <button onClick={handleCrearCancha}>Crear cancha</button>
        </div>

        {canchas.length > 0 && (
          <div style={{ marginTop: 12, fontSize: 14 }}>
            <strong>Canchas creadas:</strong>{" "}
            {canchas.map((c) => c.props.nombre).join(", ")}
          </div>
        )}
      </section>

      {/* ----- Crear reserva ----- */}
      <section>
        <h2>Crear Reserva</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <label>
            Cancha
            <select
              value={form.canchaId}
              onChange={(e) => handleChange("canchaId", e.target.value)}
            >
              <option value="">Selecciona una cancha</option>
              {canchas.map((c) => (
                <option key={c.props.id} value={c.props.id}>
                  {c.props.nombre} - L.{c.props.precioPorHora}/h
                </option>
              ))}
            </select>
          </label>

          <label>
            Usuario ID
            <input
              value={form.usuarioId}
              onChange={(e) => handleChange("usuarioId", e.target.value)}
            />
          </label>

          <label>
            Fecha (YYYY-MM-DD)
            <input
              value={form.fecha}
              onChange={(e) => handleChange("fecha", e.target.value)}
            />
          </label>

          <label>
            Hora inicio (HH:MM)
            <input
              value={form.horaInicio}
              onChange={(e) => handleChange("horaInicio", e.target.value)}
            />
          </label>

          <label>
            Hora fin (HH:MM)
            <input
              value={form.horaFin}
              onChange={(e) => handleChange("horaFin", e.target.value)}
            />
          </label>

          <button onClick={handleSubmit} disabled={isSubmitting}>
            {isSubmitting ? "Creando..." : "Crear reserva"}
          </button>
        </div>
      </section>

      {/* Errores de validación */}
      {errors.length > 0 && (
        <div style={{ marginTop: 16, color: "red" }}>
          <h3>Errores:</h3>
          <ul>
            {errors.map((err, idx) => (
              <li key={idx}>{err}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Acciones sobre la última reserva */}
      {lastReserva && (
        <div style={{ marginTop: 24, border: "1px solid #ccc", padding: 8 }}>
          <h3>Acciones de la reserva</h3>

          <button
            onClick={async () => {
              try {
                const res = await pagarReserva(lastReserva.props.id);
                setLastReserva(res);
              } catch (err) {
                alert((err as Error).message);
              }
            }}
            style={{ marginRight: 8 }}
          >
            Pagar reserva
          </button>

          <button
            onClick={async () => {
              try {
                const res = await cancelarReserva(lastReserva.props.id);
                setLastReserva(res);
              } catch (err) {
                alert((err as Error).message);
              }
            }}
          >
            Cancelar reserva
          </button>

          <pre style={{ marginTop: 16 }}>
            {JSON.stringify(lastReserva, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}

export default App;