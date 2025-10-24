import "../Home/Home.css";
import Productos from '../Productos/Productos.jsx';

export default function Home({ productos, agregarAlCarrito, isAuthenticated }) {
  return (
    <div className="home-container">
      <div className="inicio">
        <h1> Bienvenido a ATS </h1>
        <p className="descripcion">
          Descubrí productos de calidad seleccionados especialmente para vos.
          Explora nuestras categorías, agregá lo que más te guste al carrito y
          completá tu compra fácil, rápida y segura.
        </p>
      </div>

      <section className="productos-destacados">
        <h2>Productos</h2>

        <Productos
          productos={productos}
          agregarAlCarrito={agregarAlCarrito}
          isAuthenticated={isAuthenticated}
        />
      </section>
    </div>
  );
}
