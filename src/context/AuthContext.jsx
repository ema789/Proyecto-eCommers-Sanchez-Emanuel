import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {  

  // -----------------------------
  // EFECTO: Recuperar sesión de usuario
  // -----------------------------

  // Estado de autenticación del usuario
  const [isAuthenticated, setIsAuthenticated] = useState(() => {

    // Persistir sesión en localStorage
    return localStorage.getItem("isAuthenticated") === "true";
  });

  // -----------------------------
  // EFECTO: Guardar sesión en localStorage cuando cambie
  // -----------------------------

  useEffect(() => {
    localStorage.setItem("isAuthenticated", isAuthenticated);
  }, [isAuthenticated]);

  // -----------------------------
  // FUNCIONES DE AUTENTICACIÓN
  // -----------------------------

  // Inicia sesión (autenticación)
  const handleLogin = () => setIsAuthenticated(true);
  // Cierra sesión
  const handleLogout = () => setIsAuthenticated(false);

  return (
    <AuthContext.Provider value={{ isAuthenticated, handleLogin, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
}

// Hook para usar el contexto fácilmente
export function useAuth() {
  return useContext(AuthContext);
}
