import { useState } from "react";
import { useInventario } from "../context/InventarioContext";
import { TODAS } from "../data/categorias";
import { filtrarPorCategoria } from "../util/inventario";
import FiltroCategoria from "./FiltroCategoria";
import TarjetaProducto from "./TarjetaProducto";

function ListaProductos() {
  const { productos } = useInventario();
  const [categoria, setCategoria] = useState(TODAS);

  const productosVisibles = filtrarPorCategoria(productos, categoria);

  return (
    <div>
      <FiltroCategoria categoria={categoria} cambiarCategoria={setCategoria} />

      <p className="mb-3 text-sm text-gray-600">
        Mostrando {productosVisibles.length} de {productos.length} productos
      </p>

      {productosVisibles.length === 0 ? (
        <p className="tarjeta text-center text-gray-600">No hay productos en esta categoría todavía.</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {productosVisibles.map((producto) => (
            <TarjetaProducto key={producto.id} producto={producto} />
          ))}
        </div>
      )}
    </div>
  );
}

export default ListaProductos;
