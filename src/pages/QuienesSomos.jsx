function QuienesSomos() {
  return (
    <section className="mx-auto max-w-2xl">
      <h1 className="titulo-pagina">Quiénes somos</h1>

      <p className="mb-4 text-gray-700">
        Supermercado Nacional nació en 1998 como un local de barrio con una idea simple:
        que las familias encuentren lo que necesitan, a buen precio y sin filas largas.
      </p>

      <div className="grid gap-3">
        <div className="tarjeta">
          <h2 className="mb-1 text-xl font-bold text-rojo-oscuro">Nuestra misión</h2>
          <p>
            Tener siempre los productos del día a día disponibles, con un inventario ordenado que nos permita
            reponer a tiempo y evitar quiebres de stock.
          </p>
        </div>

        <div className="tarjeta">
          <h2 className="mb-1 text-xl font-bold text-rojo-oscuro">Nuestra visión</h2>
          <p>
            Ser el supermercado de confianza del barrio, apoyando a productores locales y cuidando la frescura de
            cada producto.
          </p>
        </div>

        <div className="tarjeta">
          <h2 className="mb-1 text-xl font-bold text-rojo-oscuro">Nuestros valores</h2>
          <ul className="list-disc pl-5">
            <li>Cercanía con los clientes</li>
            <li>Productos frescos y de calidad</li>
            <li>Precios justos</li>
            <li>Trabajo en equipo</li>
          </ul>
        </div>
      </div>
    </section>
  );
}

export default QuienesSomos;
