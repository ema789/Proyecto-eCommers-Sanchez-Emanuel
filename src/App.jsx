// Importación de dependencias principales de React y React Router
import React, { useEffect, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';

// Importación de componentes personalizados
import Layout from './components/Layout.jsx';
import Home from './components/Home.jsx';
import NavBar from './components/NavBar.jsx';
import Productos from './components/Productos.jsx';
import ProductoDetalle from './components/ProductoDetalle.jsx';
import Carrito from './components/Carrito.jsx';
import Login from './components/Login.jsx';
import RutaProtegida from './components/RutaProtegida.jsx';

// Importación de estilos CSS generales
import './Styles/app.css';

// Ruta del archivo JSON local con los productos
const API_URL = "/data/productos.json";

function App() {

  // -----------------------------
  // ESTADOS PRINCIPALES DEL APP
  // -----------------------------

  // Lista de productos cargados desde el archivo JSON
  const [productos, setProductos] = useState([]);
  // Productos agregados al carrito
  const [carrito, setCarrito] = useState([]);
  // Estados de carga y error para manejar la obtención de datos
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  // Estado de autenticación del usuario
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  // Hook para redireccionar entre rutas
  const navigate = useNavigate();

  // -----------------------------
  // EFECTO: Cargar productos
  // -----------------------------

  useEffect(() => {

    // bandera para evitar actualizar estado si el componente se desmonta
    let isMounted = true;

    const fetchProductos = async () => {
      setCargando(true);
      setError(null);
      try {
        // solicita el JSON de productos
        const res = await fetch(API_URL);

        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        
        const data = await res.json();
        // guarda los productos en el estado  
        if (isMounted) setProductos(data);
      
      } catch (err) {
        // guarda el error si ocurre
        if (isMounted) setError(err.message);
        console.error(err);
      } finally {
        // cambia el estado de carga a falso
        if (isMounted) setCargando(false);
      }
    };

    fetchProductos();
    // Limpieza: si el componente se desmonta, evita actualizar el estado
    return () => { isMounted = false; };
  }, []);

  // -----------------------------
  // EFECTO: Recuperar carrito desde localStorage
  // -----------------------------

  // Persistir carrito en localStorage
  useEffect(() => {
    const carritoGuardado = localStorage.getItem("carrito");
    if (carritoGuardado) setCarrito(JSON.parse(carritoGuardado));
  }, []);

  // -----------------------------
  // EFECTO: Guardar carrito en localStorage cuando cambie
  // -----------------------------

  useEffect(() => {
    localStorage.setItem("carrito", JSON.stringify(carrito));
  }, [carrito]);
  
  // -----------------------------
  // EFECTO: Recuperar sesión de usuario
  // -----------------------------

  // Persistir sesión en localStorage
  useEffect(() => {
    const auth = localStorage.getItem("isAuthenticated");
    if (auth === "true") setIsAuthenticated(true);
  }, []);

  // -----------------------------
  // EFECTO: Guardar sesión en localStorage cuando cambie
  // -----------------------------

  useEffect(() => {
    localStorage.setItem("isAuthenticated", isAuthenticated);
  }, [isAuthenticated]);

  // -----------------------------
  // FUNCIONES DE CARRITO
  // -----------------------------
  // Agrega un producto al carrito
  const agregarAlCarrito = (producto) => setCarrito(prev => [...prev, producto]);
  // Vacía completamente el carrito
  const vaciarCarrito = () => setCarrito([]);

  // -----------------------------
  // FUNCIONES DE AUTENTICACIÓN
  // -----------------------------
  // Inicia sesión (autenticación)
  const handleLogin = () => {
    setIsAuthenticated(true);
    navigate("/carrito");
  };
  // Cierra sesión
  const handleLogout = () => {
  setIsAuthenticated(false);
  localStorage.setItem("isAuthenticated", false);
};

// -----------------------------
// ESTRUCTURA PRINCIPAL DEL APP
// -----------------------------

return (
    
    <Layout>

      {/* Barra de navegación: recibe cantidad de productos */}
      <NavBar carritoCount={carrito.length} />
      {/* Definición de rutas principales */}
      <Routes>
        {/* Página principal */}
        <Route path="/" element={
          <>
            {cargando && <p>Cargando productos...</p>}
            {error && <p className='error'>Error: {error}</p>}
            {/* Muestra Home solo cuando no hay errores ni carga */}
            {!cargando && !error && (
              <Home
                productos={productos}
                agregarAlCarrito={agregarAlCarrito}
                isAuthenticated={isAuthenticated}
              />
            )}
          </>
        } />

        {/* Página de detalle de un producto (ruta dinámica con :id) */}
        <Route path='/productos/:id' element={
          <ProductoDetalle
            productos={productos}
            agregarAlCarrito={agregarAlCarrito}
            isAuthenticated={isAuthenticated}
          />
        } />

        {/* Carrito protegido: solo accesible si está logueado */}
        <Route path="/carrito" element={
          <RutaProtegida isAuthenticated={isAuthenticated}>
            <Carrito carrito={carrito} vaciarCarrito={vaciarCarrito} />
          </RutaProtegida>
        } />

        {/* Página de login */}
        <Route path="/login" element={
          <Login handleLogin={handleLogin} handleLogout={handleLogout} />
        } />
      </Routes>
    </Layout>
  );
}

export default App;

/*** Resumen General
Carga de datos: Usa fetch para leer productos.json desde /public/data/.

Carrito persistente: Guarda y recupera el carrito del localStorage.

Autenticación simple: Usa isAuthenticated (booleano) en localStorage.

Rutas protegidas: Evita acceder al carrito sin iniciar sesión (RutaProtegida).

Redirecciones: Usa useNavigate() para moverse entre páginas (por ejemplo, al hacer login).

Componentes reutilizables: Layout, NavBar, Home, Carrito, Login, etc.
**/