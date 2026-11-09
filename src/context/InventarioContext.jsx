import { createContext, useContext, useEffect, useState } from "react";
import productosIniciales from "../data/productosIniciales";

const CLAVE_PRODUCTOS = "supermercado-productos";
const CLAVE_CARRITO = "supermercado-carrito";

function leerGuardado(clave, valorInicial) {
  try {
    const texto = localStorage.getItem(clave);
    return texto ? JSON.parse(texto) : valorInicial;
  } catch (error) {
    return valorInicial;
  }
}

const InventarioContext = createContext(null);

export function InventarioProvider({ children }) {
  const [productos, setProductos] = useState(() => leerGuardado(CLAVE_PRODUCTOS, productosIniciales));
  const [carrito, setCarrito] = useState(() => leerGuardado(CLAVE_CARRITO, []));

  useEffect(() => {
    localStorage.setItem(CLAVE_PRODUCTOS, JSON.stringify(productos));
  }, [productos]);

  useEffect(() => {
    localStorage.setItem(CLAVE_CARRITO, JSON.stringify(carrito));
  }, [carrito]);

  const agregarProducto = (nuevo) => {
    setProductos([...productos, nuevo]);
  };

  const agregarAlCarrito = (id) => {
    const producto = productos.find((p) => p.id === id);
    if (!producto || producto.stock === 0) {
      return;
    }

    setProductos(productos.map((p) => (p.id === id ? { ...p, stock: p.stock - 1 } : p)));

    const enCarrito = carrito.find((item) => item.id === id);
    if (enCarrito) {
      setCarrito(carrito.map((item) => (item.id === id ? { ...item, cantidad: item.cantidad + 1 } : item)));
    } else {
      setCarrito([...carrito, { id: id, cantidad: 1 }]);
    }
  };

  const disminuirCantidad = (id) => {
    const enCarrito = carrito.find((item) => item.id === id);
    if (!enCarrito) {
      return;
    }

    setProductos(productos.map((p) => (p.id === id ? { ...p, stock: p.stock + 1 } : p)));

    if (enCarrito.cantidad === 1) {
      setCarrito(carrito.filter((item) => item.id !== id));
    } else {
      setCarrito(carrito.map((item) => (item.id === id ? { ...item, cantidad: item.cantidad - 1 } : item)));
    }
  };

  const quitarDelCarrito = (id) => {
    const enCarrito = carrito.find((item) => item.id === id);
    if (!enCarrito) {
      return;
    }

    setProductos(productos.map((p) => (p.id === id ? { ...p, stock: p.stock + enCarrito.cantidad } : p)));
    setCarrito(carrito.filter((item) => item.id !== id));
  };

  const finalizarCompra = () => {
    setCarrito([]);
  };

  const restablecerInventario = () => {
    setProductos(productosIniciales);
    setCarrito([]);
  };

  const valor = {
    productos,
    carrito,
    agregarProducto,
    agregarAlCarrito,
    disminuirCantidad,
    quitarDelCarrito,
    finalizarCompra,
    restablecerInventario,
  };

  return <InventarioContext.Provider value={valor}>{children}</InventarioContext.Provider>;
}

export function useInventario() {
  const contexto = useContext(InventarioContext);
  if (!contexto) {
    throw new Error("useInventario debe usarse dentro de un InventarioProvider.");
  }
  return contexto;
}
