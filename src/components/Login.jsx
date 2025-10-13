// Este hook permite navegar programáticamente entre rutas dentro de la app
import { useNavigate } from "react-router-dom";
import "../Styles/login.css";

export default function Login({ handleLogin, handleLogout }) {

  // Creamos una instancia del hook useNavigate
  // La usamos para redirigir al usuario a otra 
  // ruta (por ejemplo, a la página de inicio)
  const navigate = useNavigate();

  return (
    <div className="login-container">
      <h2>REGISTRATE</h2>
      <div className="auth-button">
        {/* Botón que ejecuta la función handleLogin cuando se hace clic */}
        <button onClick={handleLogin}>Login</button>
        {/* Botón que ejecuta handleLogout y luego redirige 
        al usuario a la página principal ("/") */}
        <button onClick={() => { handleLogout(); // Cierra la sesión o elimina datos del usuario 
                                 navigate("/"); //redirige al inicio
                                 }}>Logout</button>
      </div>
    </div>
  );
}
