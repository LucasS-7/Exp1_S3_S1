import { Link } from "react-router-dom";

function NoEncontrada() {
  return (
    <section className="tarjeta mx-auto max-w-xl text-center">
      <h1 className="titulo-pagina">Página no encontrada</h1>
      <p className="mb-4 text-gray-700">La dirección que buscas no existe.</p>
      <Link to="/" className="btn-primario">
        Volver al inicio
      </Link>
    </section>
  );
}

export default NoEncontrada;
