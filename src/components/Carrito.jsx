import "../Styles/carrito.css";
export default function Carrito({ carrito, vaciarCarrito }) {
  const total = carrito.reduce((acc, p) => acc + p.precio, 0);

  return (
    <div className="carrito">
      <h2> Carrito de Compras </h2>
      {carrito.length === 0 ? (
        <p>El carrito esta vacio</p>
      ) : (
        <>
          <ul>
            {carrito.map((p, index) => (
              <li key={index} className="carrito-item">
                <img src={p.imagen} alt={p.nombre} className="carrito-imagen" />
                <span className="carrito-nombre">{p.nombre}</span>
                <span className="carrito-precio">${p.precio}</span>
              </li>
            ))}
          </ul>
          <p className="total">total: ${total}</p>
          <button className="vaciar-btn" onClick={vaciarCarrito}>Vaciar Carrito</button>
        </>
      )}
    </div>
  );
}
