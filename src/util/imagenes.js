export function nombreImagen(nombreProducto, extension) {
  const primeraPalabra = nombreProducto.trim().split(" ")[0];

  const limpia = primeraPalabra
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]/g, "");

  if (limpia === "") {
    return "";
  }
  return limpia + "." + extension;
}
