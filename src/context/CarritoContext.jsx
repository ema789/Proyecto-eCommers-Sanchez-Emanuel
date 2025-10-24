import { createContext, useContext, useEffect, useState } from "react";
// 1️⃣ Crear el contexto
const CarritoContext = createContext();
export function CarritoProvider({ children }) {

  // -----------------------------
  // EFECTO: Recuperar carrito desde localStorage
  // -----------------------------

  // Productos agregados al carrito
  const [carrito, setCarrito] = useState(() => {
    // Persistir carrito en localStorage
    const carritoGuardado = localStorage.getItem("carrito");
    return carritoGuardado ? JSON.parse(carritoGuardado) : [];
  });

  // -----------------------------
  // EFECTO: Guardar carrito en localStorage cuando cambie
  // -----------------------------

  useEffect(() => {
    localStorage.setItem("carrito", JSON.stringify(carrito));
  }, [carrito]);

  // -----------------------------
  // FUNCIONES DE CARRITO
  // -----------------------------
  // Agrega un producto al carrito
  const agregarAlCarrito = (producto) =>
    setCarrito((prev) => [...prev, producto]);
  // Vacía completamente el carrito
  const vaciarCarrito = () => setCarrito([]);

  // Total de todos los productos en el carrito
  const total = carrito.reduce((acc, p) => acc + p.precio, 0);


  return (
    <CarritoContext.Provider value={{ carrito, agregarAlCarrito, vaciarCarrito, total }} >
       {children}
    </CarritoContext.Provider>
  );
}
export function useCarrito() {
    return useContext(CarritoContext);
}
