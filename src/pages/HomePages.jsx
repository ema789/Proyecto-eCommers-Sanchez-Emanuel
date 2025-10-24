import React from "react";
import { useFetchProductos } from "../hooks/useFetchProductos.js";
import { useCarrito } from "../context/CarritoContext.jsx";
import { useAuth } from "../context/AuthContext.jsx";
import Home from "../components/Home/Home.jsx";

const API_URL = "/data/productos.json";

export default function HomePage(){
  const { productos, cargando, error } = useFetchProductos(API_URL);
  const { agregarAlCarrito } = useCarrito();
  const { isAuthenticated } = useAuth();

  if (cargando) return <p>Cargando productos...</p>;
  if (error) return <p className="error">Error: {error}</p>;

  return (
    <Home
      productos={productos}
      agregarAlCarrito={agregarAlCarrito}
      isAuthenticated={isAuthenticated}
    />
  );
};