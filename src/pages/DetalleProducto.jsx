import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useInventario } from "../context/InventarioContext";
import ImagenProducto from "../components/ImagenProducto";
import { formatoPrecio, STOCK_BAJO } from "../util/inventario";

function DetalleProducto() {
  const { id } = useParams();
  const { productos, carrito, agregarAlCarrito } = useInventario();
  const [aviso, setAviso] = useState("");

  const producto = productos.find((p) => String(p.id) === id);

  if (!producto) {
    return (
      <section className="tarjeta mx-auto max-w-xl text-center">
        <h1 className="titulo-pagina">Producto no encontrado</h1>
        <p className="mb-4 text-gray-700">El producto que buscas no existe.</p>
        <Link to="/" className="btn-primario">
          Volver al inventario
        </Link>
      </section>
    );
  }

  const sinStock = producto.stock === 0;
  const enCarrito = carrito.find((item) => item.id === producto.id);
  const cantidadEnCarrito = enCarrito ? enCarrito.cantidad : 0;

  const manejarAgregar = () => {
    agregarAlCarrito(producto.id);
    setAviso("Producto agregado al carrito.");
  };

  return (
    <section className="mx-auto max-w-2xl">
      <div className="mb-4 flex flex-wrap gap-2">
        <Link to="/" className="btn-secundario">
          Volver al inventario
        </Link>
        <Link to="/carrito" className="btn-primario">
          Ir al carrito
        </Link>
      </div>

      <article className="tarjeta">
        <ImagenProducto producto={producto} clase="mb-4 h-72 w-full rounded-md" />
        <span className="etiqueta bg-rojo/10 text-rojo">{producto.categoria}</span>
        <h1 className="mt-2 text-3xl font-bold text-rojo-oscuro">{producto.nombre}</h1>
        <p className="my-2 text-3xl font-bold">{formatoPrecio(producto.precio)}</p>
        <p className="mb-4 text-gray-700">{producto.descripcion}</p>

        <p className="font-bold">{sinStock ? "Sin stock disponible" : "Disponibles: " + producto.stock}</p>
        {producto.stock > 0 && producto.stock <= STOCK_BAJO && (
          <span className="etiqueta mt-1 bg-rojo text-white">Stock bajo</span>
        )}
        <p className="mb-4 mt-1 text-sm text-gray-600">En tu carrito: {cantidadEnCarrito}</p>

        <button type="button" className="btn-primario" onClick={manejarAgregar} disabled={sinStock}>
          Agregar al carrito
        </button>

        <p role="status" className="mt-3 text-sm font-bold text-azul">
          {aviso}
        </p>
      </article>
    </section>
  );
}

export default DetalleProducto;
