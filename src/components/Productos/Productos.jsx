// - Link: para crear enlaces internos entre rutas
// sin recargar la página
// - useNavigate: para redirigir al usuario de forma programada
// (por ejemplo, después de hacer clic)
import { Link, useNavigate } from "react-router-dom";
import "../Productos/productos.css";
import BontonGlobal from "../BontonGlobal";

// Definimos el componente funcional Productos
// Recibe como props:
// - productos: lista de todos los productos disponibles
// - agregarAlCarrito: función que agrega un producto al carrito
// - isAuthenticated: indica si el usuario está logueado o no (true/false)
export default function Productos({
  productos,
  agregarAlCarrito,
  isAuthenticated,
}) {
  // Hook que nos permite redirigir a otra página dentro de la app
  const navigate = useNavigate();

  return (
    <div className="lista-productos">
      {/* Recorremos el array de productos con .map() para renderizar uno por uno */}
      {productos.map((p) => (
        // Cada producto se representa dentro de una tarjeta
        // La propiedad "key" es importante para que React
        // identifique cada elemento de la lista

        <div key={p.id} className="productos-card">
          <img src={p.imagen} alt={p.nombre} className="productos-imagen" />
          <h3>{p.nombre}</h3>
          <p>Precio: ${p.precio}</p>
          {/* Botones */}
          <div className="botones-productos">
            {/* Botón de agregar al carrito */}

            <BontonGlobal 
                texto="agregar Al Carrito"
                onClick={()=>{
                  if(!isAuthenticated) navigate("/login");
                  else agregarAlCarrito(p);
                }}
                tipo="primario"
                />

            {/* Link para ver detalle */}
            <Link to={`/productos/${p.id}`} className="ver-detalle">
              <BontonGlobal texto="Ver Detalle" tipo="primario" />
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
