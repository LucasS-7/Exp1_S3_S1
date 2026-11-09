import { useState } from "react";
import { Link } from "react-router-dom";
import { useInventario } from "../context/InventarioContext";
import { CATEGORIAS } from "../data/categorias";
import { validarProducto } from "../util/validaciones";
import { nombreImagen } from "../util/imagenes";

const valoresVacios = {
  nombre: "",
  categoria: CATEGORIAS[0],
  precio: "",
  stock: "",
  descripcion: "",
  conFoto: false,
  extension: "jpg",
};

function AgregarProducto() {
  const { agregarProducto } = useInventario();
  const [valores, setValores] = useState(valoresVacios);
  const [errores, setErrores] = useState({});
  const [exito, setExito] = useState(false);
  const [fotoGuardada, setFotoGuardada] = useState("");

  const nombreFoto = nombreImagen(valores.nombre, valores.extension);

  const manejarCambio = (e) => {
    const { name, value, type, checked } = e.target;
    setValores({ ...valores, [name]: type === "checkbox" ? checked : value });
  };

  const manejarEnvio = (e) => {
    e.preventDefault();

    const erroresEncontrados = validarProducto(valores);
    setErrores(erroresEncontrados);

    if (Object.keys(erroresEncontrados).length > 0) {
      setExito(false);
      return;
    }

    const imagen = valores.conFoto ? nombreFoto : "";

    agregarProducto({
      id: Date.now(),
      imagen: imagen,
      nombre: valores.nombre.trim(),
      categoria: valores.categoria,
      precio: Number(valores.precio),
      stock: Number(valores.stock),
      descripcion: valores.descripcion.trim(),
    });

    setValores(valoresVacios);
    setFotoGuardada(imagen);
    setExito(true);
  };

  return (
    <section className="mx-auto max-w-xl">
      <h1 className="titulo-pagina">Agregar producto</h1>

      {exito && (
        <div role="status" className="tarjeta mb-4 border-azul text-azul">
          <p className="font-bold">¡Producto agregado al inventario!</p>
          {fotoGuardada !== "" && (
            <p className="text-sm">
              Copia tu foto con el nombre <strong>{fotoGuardada}</strong> a la carpeta <strong>public/img</strong>.
              Mientras no esté, se muestra un emoji.
            </p>
          )}
          <Link to="/" className="underline">
            Ver el inventario
          </Link>
        </div>
      )}

      <form className="tarjeta" onSubmit={manejarEnvio} noValidate>
        <label htmlFor="nombre" className="etiqueta-campo">
          Nombre
        </label>
        <input
          id="nombre"
          name="nombre"
          type="text"
          className="campo"
          value={valores.nombre}
          onChange={manejarCambio}
          placeholder="Ej: Lavaloza 2Lt"
        />
        {errores.nombre && <p className="mensaje-error">{errores.nombre}</p>}

        <label htmlFor="categoria" className="etiqueta-campo">
          Categoría
        </label>
        <select id="categoria" name="categoria" className="campo" value={valores.categoria} onChange={manejarCambio}>
          {CATEGORIAS.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
        {errores.categoria && <p className="mensaje-error">{errores.categoria}</p>}

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label htmlFor="precio" className="etiqueta-campo">
              Precio ($)
            </label>
            <input
              id="precio"
              name="precio"
              type="number"
              min="1"
              className="campo"
              value={valores.precio}
              onChange={manejarCambio}
            />
            {errores.precio && <p className="mensaje-error">{errores.precio}</p>}
          </div>
          <div>
            <label htmlFor="stock" className="etiqueta-campo">
              Stock (unidades)
            </label>
            <input
              id="stock"
              name="stock"
              type="number"
              min="0"
              className="campo"
              value={valores.stock}
              onChange={manejarCambio}
            />
            {errores.stock && <p className="mensaje-error">{errores.stock}</p>}
          </div>
        </div>

        <label htmlFor="descripcion" className="etiqueta-campo">
          Descripción
        </label>
        <textarea
          id="descripcion"
          name="descripcion"
          rows="3"
          className="campo"
          value={valores.descripcion}
          onChange={manejarCambio}
        />
        {errores.descripcion && <p className="mensaje-error">{errores.descripcion}</p>}

        <div className="mt-4 flex items-center gap-2">
          <input
            id="conFoto"
            name="conFoto"
            type="checkbox"
            className="h-4 w-4 accent-rojo"
            checked={valores.conFoto}
            onChange={manejarCambio}
          />
          <label htmlFor="conFoto" className="font-bold">
            Este producto tiene foto
          </label>
        </div>

        {valores.conFoto && (
          <div className="mt-2 rounded-md bg-gray-100 p-3 text-sm">
            <label htmlFor="extension" className="etiqueta-campo mt-0">
              Formato de la foto
            </label>
            <select
              id="extension"
              name="extension"
              className="campo mb-2 sm:w-40"
              value={valores.extension}
              onChange={manejarCambio}
            >
              <option value="jpg">jpg</option>
              <option value="png">png</option>
              <option value="webp">webp</option>
            </select>

            {nombreFoto === "" ? (
              <p>Escribe el nombre del producto para ver cómo se debe llamar la foto.</p>
            ) : (
              <p>
                La foto debe llamarse <strong>{nombreFoto}</strong> y guardarse en la carpeta{" "}
                <strong>public/img</strong> del proyecto.
              </p>
            )}
          </div>
        )}

        <button type="submit" className="btn-primario mt-4">
          Guardar producto
        </button>
      </form>
    </section>
  );
}

export default AgregarProducto;
