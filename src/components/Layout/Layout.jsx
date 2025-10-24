import '../Layout/layout.css';
export default function Layout({ children }) {
  
  // El componente recibe una propiedad especial 
  //llamada "children"
  // que representa todo el contenido hijo que se 
  // coloca dentro del componente Layout

  return (
    <div className="layout" >
      {/* Renderizamos aquí los elementos hijos 
      pasados al componente */}
      {children}
    </div>
  );
}

//** Layout actúa como un contenedor general o 
// plantilla que envuelve otras partes de tu aplicación.**/