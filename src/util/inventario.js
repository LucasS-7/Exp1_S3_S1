import { TODAS } from "../data/categorias";

export const STOCK_BAJO = 5;

export function filtrarPorCategoria(productos, categoria) {
  if (categoria === TODAS) {
    return productos;
  }
  return productos.filter((p) => p.categoria === categoria);
}

export function formatoPrecio(numero) {
  return "$" + numero.toLocaleString("es-CL");
}
