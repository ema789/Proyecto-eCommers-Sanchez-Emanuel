import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom"; 
export function useFetchProductos( apiUrl ){

     // -----------------------------
      // ESTADOS PRINCIPALES DEL APP
      // -----------------------------
    
      // Lista de productos cargados desde el archivo JSON
      const [productos, setProductos] = useState([]);

      // Estados de carga y error para manejar la obtención de datos
      const [cargando, setCargando] = useState(true);
      const [error, setError] = useState(null);

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
            const res = await fetch(apiUrl);
    
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
    }, [apiUrl]);

    return { productos, cargando, error };    
}
