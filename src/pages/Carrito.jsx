import { useState } from "react";
import { Link } from "react-router-dom";
import { useInventario } from "../context/InventarioContext";
import ImagenProducto from "../components/ImagenProducto";
import { formatoPrecio } from "../util/inventario";

function Carrito() {
  const { productos, carrito, agregarAlCarrito, disminuirCantidad, quitarDelCarrito, finalizarCompra } =
    useInventario();
  const [aviso, setAviso] = useState("");

  const items = carrito.map((item) => {
    const producto = productos.find((p) => p.id === item.id);
    return { ...item, producto: producto };
  }).filter((item) => item.producto !== undefined);

  const totalUnidades = carrito.reduce((suma, item) => suma + item.cantidad, 0);
  const totalPagar = items.reduce((suma, item) => suma + item.cantidad * item.producto.precio, 0);

  const manejarFinalizar = () => {
    finalizarCompra();
    setAviso("¡Compra realizada! Gracias por preferir Supermercado Nacional.");
  };

  return (
    <section className="mx-auto max-w-3xl">
      <h1 className="titulo-pagina">Carrito de compras</h1>

      <p role="status" className="mb-3 font-bold text-azul">
        {aviso}
      </p>

      {items.length === 0 ? (
        <div className="tarjeta text-center">
          <p className="mb-4 text-gray-700">Tu carrito está vacío. Agrega productos desde el inventario.</p>
          <Link to="/" className="btn-primario">
            Ver inventario
          </Link>
        </div>
      ) : (
        <>
          <ul className="flex flex-col gap-3">
            {items.map((item) => (
              <li key={item.id} className="tarjeta flex flex-col gap-3 sm:flex-row sm:items-center">
                <ImagenProducto producto={item.producto} clase="h-20 w-20 shrink-0 rounded-md" />

                <div className="grow">
                  <h2 className="font-bold text-rojo-oscuro">{item.producto.nombre}</h2>
                  <p className="text-sm text-gray-600">Precio: {formatoPrecio(item.producto.precio)}</p>
                  <p className="text-sm text-gray-600">Disponibles en inventario: {item.producto.stock}</p>
                  <p className="font-bold">Subtotal: {formatoPrecio(item.cantidad * item.producto.precio)}</p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    className="btn-secundario"
                    onClick={() => disminuirCantidad(item.id)}
                    aria-label={"Disminuir cantidad de " + item.producto.nombre}
                  >
                    -
                  </button>
                  <span className="min-w-8 text-center text-lg font-bold">{item.cantidad}</span>
                  <button
                    type="button"
                    className="btn-secundario"
                    onClick={() => agregarAlCarrito(item.id)}
                    disabled={item.producto.stock === 0}
                    aria-label={"Aumentar cantidad de " + item.producto.nombre}
                  >
                    +
                  </button>
                  <button
                    type="button"
                    className="rounded-md px-2 py-2 text-sm font-bold text-rojo underline focus:outline-none focus:ring-2 focus:ring-azul"
                    onClick={() => quitarDelCarrito(item.id)}
                  >
                    Quitar
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <div className="tarjeta mt-4">
            <p>Unidades en el carrito: {totalUnidades}</p>
            <p className="mb-3 text-2xl font-bold">Total a pagar: {formatoPrecio(totalPagar)}</p>
            <button type="button" className="btn-primario" onClick={manejarFinalizar}>
              Finalizar compra
            </button>
          </div>
        </>
      )}
    </section>
  );
}

export default Carrito;
