import { useState } from "react";
import { EMOJIS } from "../data/categorias";

function ImagenProducto({ producto, clase }) {
  const [fallo, setFallo] = useState(false);

  if (!producto.imagen || fallo) {
    return (
      <div className={"flex items-center justify-center bg-gray-100 text-5xl " + clase}>
        {EMOJIS[producto.categoria]}
      </div>
    );
  }

  return (
    <img
      src={import.meta.env.BASE_URL + "img/" + producto.imagen}
      alt={producto.nombre}
      onError={() => setFallo(true)}
      className={"object-cover " + clase}
    />
  );
}

export default ImagenProducto;
