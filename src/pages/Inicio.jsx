import { useInventario } from "../context/InventarioContext";
import { STOCK_BAJO } from "../util/inventario";
import ListaProductos from "../components/ListaProductos";

function Inicio() {
  const { productos, restablecerInventario } = useInventario();

  const totalUnidades = productos.reduce((suma, p) => suma + p.stock, 0);
  const cantidadStockBajo = productos.filter((p) => p.stock <= STOCK_BAJO).length;

  const manejarRestablecer = () => {
    if (window.confirm("¿Volver al inventario inicial? Se borrarán los productos agregados y el carrito.")) {
      restablecerInventario();
    }
  };

  return (
    <section>
      <h1 className="titulo-pagina">Inventario del supermercado</h1>
      <p className="mb-4 text-gray-700">
        Revisa los productos disponibles, filtra por categoría y haz clic en uno para ver su detalle.
      </p>

      <div className="mb-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
        <div className="tarjeta">
          <p className="text-3xl font-bold text-azul">{productos.length}</p>
          <p className="text-sm text-gray-600">productos distintos</p>
        </div>
        <div className="tarjeta">
          <p className="text-3xl font-bold text-azul">{totalUnidades}</p>
          <p className="text-sm text-gray-600">unidades disponibles</p>
        </div>
        <div className="tarjeta">
          <p className="text-3xl font-bold text-rojo">{cantidadStockBajo}</p>
          <p className="text-sm text-gray-600">con stock bajo o agotado</p>
        </div>
      </div>

      <ListaProductos />

      <div className="mt-8 border-t border-borde pt-4">
        <button type="button" className="btn-secundario" onClick={manejarRestablecer}>
          Restablecer inventario
        </button>
        <p className="mt-1 text-sm text-gray-600">Vuelve a los 10 productos iniciales y vacía el carrito.</p>
      </div>
    </section>
  );
}

export default Inicio;
