// Importación de dependencias principales de React y React Router
import { Routes, Route } from 'react-router-dom';

// Importación de componentes personalizados
import Layout from './components/Layout/Layout.jsx';

import HomePage from './pages/HomePages.jsx';
import NavBar from './components/NavBar/NavBar.jsx';

import ProductoDetallePages from './pages/ProductoDetallePage.jsx';
import CarritoPage from './pages/CarritoPage.jsx';

import LoginPage from './pages/LoginPage.jsx';
import RutaProtegida from './components/RutaProtegida/RutaProtegida.jsx';

// Importación de estilos CSS generales
import './Styles/app.css';

function App() {

  
// -----------------------------
// ESTRUCTURA PRINCIPAL DEL APP
// -----------------------------

return (
    
    <Layout>

      {/* Barra de navegación: recibe cantidad de productos */}
      <NavBar/>
      {/* Definición de rutas principales */}
      <Routes>
        {/* Página principal */}
        <Route path="/" element={<HomePage/>} />

        {/* Página de detalle de un producto (ruta dinámica con :id) */}
        <Route path='/productos/:id' element={<ProductoDetallePages/>} />

        {/* Carrito protegido: solo accesible si está logueado */}
        <Route path="/carrito" element={
          <RutaProtegida>
            <CarritoPage/>
          </RutaProtegida>
        } />

        {/* Página de login */}
        <Route path="/login" element={<LoginPage />} />
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