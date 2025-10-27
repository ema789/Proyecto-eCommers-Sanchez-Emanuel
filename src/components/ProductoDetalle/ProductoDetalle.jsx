// Este hook permite acceder a los parámetros de la URL 
// (por ejemplo: /productos/1)
import { useParams } from "react-router-dom";
// - useNavigate: para redirigir al usuario de forma programada 
// (por ejemplo, después de hacer clic)
import { useNavigate } from "react-router-dom";
import "../ProductoDetalle/productoDetalle.css";

import { useFetchProductos } from "../../hooks/useFetchProductos.js";
import { useCarrito } from "../../context/CarritoContext.jsx";
import { useAuth } from "../../context/AuthContext.jsx";
import BontonGlobal from "../BontonGlobal";

const API_URL = "/data/productos.json";

// Definimos el componente funcional ProductoDetalle
// Recibe como props:
// - productos: lista completa de productos
// - agregarAlCarrito: función para añadir un producto al carrito
export default function ProductoDetalle() {

  // Hook que nos permite redirigir a otra página dentro de la app
  const navigate = useNavigate();
  
  // Extraemos el parámetro "id" de la URL mediante el hook useParams
  // Ejemplo: si la ruta es "/productos/3", entonces id = "3"
  const { id } = useParams();

  const { productos, cargando, error } = useFetchProductos(API_URL);
  const { agregarAlCarrito } = useCarrito();
  const { isAuthenticated } = useAuth();

    // === Estado de carga o error ===
  if (cargando) return <p className="mensaje">Cargando producto...</p>;
  if (error) return <p className="error">Error: {error}</p>;

  // Buscamos dentro del array de productos 
  // el que tenga un id igual al de la URL
  // parseInt convierte el id (que llega como string) 
  // a número para poder comparar correctamente
  const producto = productos.find((p) => p.id === parseInt(id));

  // Si no se encuentra el producto con ese ID, 
  // se muestra un mensaje al usuario
  if (!producto) return <h2>Producto no encontrado</h2>;

  // === Manejar agregar al carrito ===
  const handleAgregar = () => {
                  // Si el usuario no está autenticado, 
              // se lo redirige a la página de login
    if (!isAuthenticated) {
      navigate("/login");
    } else {
      // Si está logueado, se agrega el producto al carrito
      agregarAlCarrito(producto);
    }
  };

  return (
    <div className="producto-detalle">
      <div className="producto-card">
        <h1>{producto.nombre}</h1>
        <img
          src={producto.imagen}
          alt={producto.nombre}
          className="imagen-detalle"
        />
        <p>Precio: ${producto.precio}</p>

        <BontonGlobal texto="Agregar al Carrito" tipo="primario" onClick={handleAgregar}/>
{/** 
        <button className="carrito-btn" onClick={handleAgregar}>
          Agregar al carrito
        </button>**/}
      </div>
    </div>
  );
}
