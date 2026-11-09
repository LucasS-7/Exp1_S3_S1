import { CATEGORIAS, TODAS } from "../data/categorias";

function FiltroCategoria({ categoria, cambiarCategoria }) {
  return (
    <div className="mb-4 sm:w-64">
      <label htmlFor="filtro-categoria" className="etiqueta-campo">
        Filtrar por categoría
      </label>
      <select
        id="filtro-categoria"
        className="campo"
        value={categoria}
        onChange={(e) => cambiarCategoria(e.target.value)}
      >
        <option value={TODAS}>{TODAS}</option>
        {CATEGORIAS.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>
    </div>
  );
}

export default FiltroCategoria;
