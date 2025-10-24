import React from "react";
import { useAuth } from "../context/AuthContext.jsx";
import Login from "../components/Login/Login.jsx";


export default function LoginPage() {
  const { handleLogin, handleLogout } = useAuth();
  return <Login handleLogin={handleLogin} handleLogout={handleLogout} />;
}