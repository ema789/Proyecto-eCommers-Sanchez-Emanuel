import React from "react";
import '../components/button.css';

export default function BontonGlobal({
   texto, 
   onClick, 
   tipo= "primario", 
   deshabilitado = false }) {
  return (
    <button
      className={`btn-global ${tipo}`}
      onClick={onClick}
      disabled={deshabilitado}
    >
      {texto}
    </button>
  );
}
