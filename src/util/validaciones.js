import { CATEGORIAS } from "../data/categorias";
import { nombreImagen } from "./imagenes";

export function validarProducto(valores) {
  const errores = {};

  if (valores.nombre.trim().length < 3) {
    errores.nombre = "El nombre debe tener al menos 3 letras.";
  }

  if (valores.conFoto && nombreImagen(valores.nombre, valores.extension) === "") {
    errores.nombre = "La primera palabra del nombre debe tener letras o números para poder nombrar la foto.";
  }

  if (!CATEGORIAS.includes(valores.categoria)) {
    errores.categoria = "Elige una categoría.";
  }

  const precio = Number(valores.precio);
  if (valores.precio === "" || !Number.isInteger(precio) || precio <= 0) {
    errores.precio = "El precio debe ser un número entero mayor a 0.";
  }

  const stock = Number(valores.stock);
  if (valores.stock === "" || !Number.isInteger(stock) || stock < 0) {
    errores.stock = "El stock debe ser un número entero de 0 o más.";
  }

  if (valores.descripcion.trim().length < 10) {
    errores.descripcion = "La descripción debe tener al menos 10 caracteres.";
  }

  return errores;
}
