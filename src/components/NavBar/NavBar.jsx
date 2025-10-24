import { Link } from "react-router-dom";
import '../NavBar/navbar.css';

export default function NavBar() {
  return (
    <nav className="navbar">
      <ul className="navbar-list">
        <li className="navbar-item">
          <Link className="navbar-link" to="/">Home</Link>
        </li>

        
            <li className="navbar-item">
              <Link className="navbar-link" to="/carrito">
                Carrito 
              </Link>
            </li>
        
          <li className="navbar-item">
            <Link className="navbar-link" to="/login">Registrar</Link>
          </li>
        
  

      </ul>
    </nav>
  );
}