import { useState } from "react";
import "./Portada.css";

/*
  foto           → foto para celular (vertical)
  fotoHorizontal → opcional: versión horizontal para compu/tablet acostada.
                   Si no la pasás, usa la misma "foto".
*/
function Portada({ onIngresar, foto, fotoHorizontal }) {
  const [saliendo, setSaliendo] = useState(false);

  const handleClick = () => {
    setSaliendo(true);
    // Espera que termine el fundido antes de mostrar la tarjeta
    setTimeout(onIngresar, 800);
  };

  // Pasamos las fotos al CSS como variables
  const estiloFondo = foto
    ? {
        "--foto-vertical": `url(${foto})`,
        "--foto-horizontal": `url(${fotoHorizontal || foto})`,
      }
    : undefined;

  return (
    <section className={`portada ${saliendo ? "portada--saliendo" : ""}`}>
      <div
        className={`portada__fondo ${foto ? "" : "portada__fondo--vacio"}`}
        style={estiloFondo}
      />
      <div className="portada__sombra" />
      <div className="portada__marco" />

      <div className="portada__contenido">
        <p className="portada__etiqueta">Bienvenidos</p>
        <h1 className="portada__nombres">Mica y Joni</h1>
        <p className="portada__texto">Tenemos algo muy especial para contarte</p>

        <button className="portada__boton" onClick={handleClick}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
            <rect x="3" y="5" width="18" height="14" rx="2" />
            <path d="M3 7l9 6 9-6" />
          </svg>
          Ingresar
        </button>
      </div>
    </section>
  );
}

export default Portada;