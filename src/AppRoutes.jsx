import { Routes, Route } from "react-router-dom";
import Inicio from "./pages/Inicio";
import AgregarProducto from "./pages/AgregarProducto";
import DetalleProducto from "./pages/DetalleProducto";
import Carrito from "./pages/Carrito";
import QuienesSomos from "./pages/QuienesSomos";
import Contactanos from "./pages/Contactanos";
import NoEncontrada from "./pages/NoEncontrada";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Inicio />} />
      <Route path="/agregar" element={<AgregarProducto />} />
      <Route path="/producto/:id" element={<DetalleProducto />} />
      <Route path="/carrito" element={<Carrito />} />
      <Route path="/quienes-somos" element={<QuienesSomos />} />
      <Route path="/contactanos" element={<Contactanos />} />
      <Route path="*" element={<NoEncontrada />} />
    </Routes>
  );
}

export default AppRoutes;
