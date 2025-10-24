import Carrito from '../components/Carrito/Carrito.jsx';
import { useCarrito } from "../context/CarritoContext.jsx";


export default function CarritoPage(){
    const { carrito, vaciarCarrito, total } = useCarrito();
    return <Carrito carrito={carrito} vaciarCarrito={vaciarCarrito} total={total} />;
};