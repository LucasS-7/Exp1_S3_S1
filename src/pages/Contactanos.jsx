import { useState } from "react";

function Contactanos() {
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState("");
  const [enviado, setEnviado] = useState(false);

  const manejarEnvio = (e) => {
    e.preventDefault();
    setEnviado(false);

    if (nombre.trim() === "" || correo.trim() === "" || mensaje.trim() === "") {
      setError("Completa todos los campos.");
      return;
    }
    if (!correo.includes("@")) {
      setError("Escribe un correo válido.");
      return;
    }

    setError("");
    setEnviado(true);
    setNombre("");
    setCorreo("");
    setMensaje("");
  };

  return (
    <section className="mx-auto max-w-xl">
      <h1 className="titulo-pagina">Contáctanos</h1>

      <div className="tarjeta mb-4">
        <h2 className="mb-2 text-xl font-bold text-rojo-oscuro">Datos del local</h2>
        <p>📍 Av. Esquina Blanca 8374, Santiago</p>
        <p>📞 +56 2 2939 6483</p>
        <p>🕗 Lunes a domingo, de 8:00 a 22:00</p>
        <p>✉️ contacto@supermercadonacional.cl</p>
      </div>

      <form className="tarjeta" onSubmit={manejarEnvio} noValidate>
        <h2 className="text-xl font-bold text-rojo-oscuro">Escríbenos</h2>

        <label htmlFor="c-nombre" className="etiqueta-campo">
          Nombre
        </label>
        <input id="c-nombre" type="text" className="campo" value={nombre} onChange={(e) => setNombre(e.target.value)} />

        <label htmlFor="c-correo" className="etiqueta-campo">
          Correo
        </label>
        <input id="c-correo" type="email" className="campo" value={correo} onChange={(e) => setCorreo(e.target.value)} />

        <label htmlFor="c-mensaje" className="etiqueta-campo">
          Mensaje
        </label>
        <textarea
          id="c-mensaje"
          rows="4"
          className="campo"
          value={mensaje}
          onChange={(e) => setMensaje(e.target.value)}
        />

        {error && <p className="mensaje-error">{error}</p>}
        {enviado && <p className="mt-2 font-bold text-azul">¡Mensaje enviado! Te responderemos pronto.</p>}

        <button type="submit" className="btn-primario mt-4">
          Enviar mensaje
        </button>
      </form>
    </section>
  );
}

export default Contactanos;
