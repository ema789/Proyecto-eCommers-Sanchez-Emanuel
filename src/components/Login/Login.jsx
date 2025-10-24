// Este hook permite navegar programáticamente entre rutas dentro de la app
import { useNavigate } from "react-router-dom";
import "../Login/login.css";

export default function Login({ handleLogin, handleLogout }) {

  // Creamos una instancia del hook useNavigate
  // La usamos para redirigir al usuario a otra 
  // ruta (por ejemplo, a la página de inicio)
  const navigate = useNavigate();

  const login = () => {
  handleLogin();
  navigate("/carrito");
};

const logout = () => {
  handleLogout();
  navigate("/");
};

  return (
    <div className="login-container">
      <h2>REGISTRATE</h2>
      <div className="auth-button">
        {/* Botón que ejecuta la función handleLogin cuando se hace clic */}
        <button onClick={login}>Login</button>
        {/* Botón que ejecuta handleLogout y luego redirige 
        al usuario a la página principal ("/") */}
        <button onClick={logout}>Logout</button>
      </div>
    </div>
  );
}
