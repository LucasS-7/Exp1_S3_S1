import { Link, NavLink } from "react-router-dom";
import { useInventario } from "../context/InventarioContext";

const enlaces = [
  { to: "/", texto: "Inventario", end: true },
  { to: "/agregar", texto: "Agregar producto", end: false },
  { to: "/quienes-somos", texto: "Quiénes somos", end: false },
  { to: "/contactanos", texto: "Contáctanos", end: false },
];

function claseEnlace({ isActive }) {
  const base = "rounded-md px-3 py-2 text-sm font-bold transition focus:outline-none focus:ring-2 focus:ring-azul ";
  return isActive ? base + "bg-white text-rojo-oscuro" : base + "text-white hover:bg-rojo";
}

function Navbar() {
  const { carrito } = useInventario();
  const totalUnidades = carrito.reduce((suma, item) => suma + item.cantidad, 0);

  return (
    <header className="border-b-4 border-azul bg-rojo-oscuro">
      <div className="mx-auto flex max-w-[1100px] flex-col gap-2 px-4 py-3 md:flex-row md:items-center md:justify-between">
        <Link to="/" className="text-2xl font-bold text-white">
          🛒 Supermercado Nacional
        </Link>

        <nav aria-label="Menú principal" className="flex flex-wrap gap-1">
          {enlaces.map((enlace) => (
            <NavLink key={enlace.to} to={enlace.to} end={enlace.end} className={claseEnlace}>
              {enlace.texto}
            </NavLink>
          ))}

          <NavLink to="/carrito" className={claseEnlace}>
            Carrito
            <span className="ml-2 inline-block min-w-6 rounded-full bg-azul px-2 text-center text-xs font-bold text-white">
              {totalUnidades}
            </span>
          </NavLink>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
