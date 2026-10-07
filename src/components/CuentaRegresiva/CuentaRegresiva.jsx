import { useState, useEffect } from "react";
import "./CuentaRegresiva.css";

// Fecha y hora de la ceremonia (hora de Argentina)
const FECHA_BODA = new Date("2026-12-26T21:00:00-03:00");

// Calcula cuánto falta
function calcularTiempo() {
  const diferencia = FECHA_BODA - new Date();

  if (diferencia <= 0) return null; // ya llegó el día

  return {
    dias: Math.floor(diferencia / (1000 * 60 * 60 * 24)),
    horas: Math.floor((diferencia / (1000 * 60 * 60)) % 24),
    minutos: Math.floor((diferencia / (1000 * 60)) % 60),
    segundos: Math.floor((diferencia / 1000) % 60),
  };
}

// Agrega un 0 adelante: 5 → "05"
const dosDigitos = (numero) => String(numero).padStart(2, "0");

function CuentaRegresiva() {
  const [tiempo, setTiempo] = useState(calcularTiempo());

  // Actualiza cada segundo
  useEffect(() => {
    const intervalo = setInterval(() => setTiempo(calcularTiempo()), 1000);
    return () => clearInterval(intervalo);
  }, []);

  return (
    <section className="seccion cuenta">
      <div className="contenedor">
        <p className="titulo-seccion">Cuenta regresiva</p>

        {tiempo ? (
          <>
          

            {/* Días: el protagonista */}
            <div className="cuenta__circulo">
              <span className="cuenta__dias">{tiempo.dias}</span>
              <span className="cuenta__dias-texto">días</span>
            </div>

            {/* Horas, minutos y segundos */}
            <div className="cuenta__detalle">
              <div className="cuenta__caja">
                <span className="cuenta__numero">{dosDigitos(tiempo.horas)}</span>
                <span className="cuenta__texto">Horas</span>
              </div>

              <div className="cuenta__caja">
                <span className="cuenta__numero">{dosDigitos(tiempo.minutos)}</span>
                <span className="cuenta__texto">Min</span>
              </div>

              <div className="cuenta__caja">
                {/* key hace que la animación se repita en cada segundo */}
                <span key={tiempo.segundos} className="cuenta__numero cuenta__numero--tic">
                  {dosDigitos(tiempo.segundos)}
                </span>
                <span className="cuenta__texto">Seg</span>
              </div>
            </div>

          </>
        ) : (
          <h2 className="cuenta__titulo">¡Hoy es el gran día!</h2>
        )}
      </div>
    </section>
  );
}

export default CuentaRegresiva;