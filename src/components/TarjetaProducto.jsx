import { Link } from "react-router-dom";
import ImagenProducto from "./ImagenProducto";
import { formatoPrecio, STOCK_BAJO } from "../util/inventario";

function TarjetaProducto({ producto }) {
  const sinStock = producto.stock === 0;
  const stockBajo = producto.stock > 0 && producto.stock <= STOCK_BAJO;

  return (
    <Link
      to={"/producto/" + producto.id}
      className="tarjeta block transition hover:-translate-y-0.5 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-azul"
    >
      <ImagenProducto producto={producto} clase="mb-3 h-40 w-full rounded-md" />
      <span className="etiqueta bg-rojo/10 text-rojo">{producto.categoria}</span>
      <h3 className="mt-2 text-lg font-bold text-rojo-oscuro">{producto.nombre}</h3>
      <p className="text-xl font-bold">{formatoPrecio(producto.precio)}</p>

      <p className="mt-2 text-sm text-gray-600">
        {sinStock ? "Sin stock" : "Disponibles: " + producto.stock}
      </p>
      {sinStock && <span className="etiqueta mt-1 bg-gray-200 text-gray-700">Agotado</span>}
      {stockBajo && <span className="etiqueta mt-1 bg-rojo text-white">Stock bajo</span>}
    </Link>
  );
}

export default TarjetaProducto;
