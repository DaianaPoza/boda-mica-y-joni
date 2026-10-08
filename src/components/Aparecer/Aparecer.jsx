import { useEffect, useRef, useState } from "react";
import "./Aparecer.css";

// Envuelve una sección y la hace aparecer cuando entra en pantalla.
// Usa IntersectionObserver: el navegador avisa cuándo se ve la sección,
// sin escuchar el scroll todo el tiempo (por eso no traba la página).
function Aparecer({ children }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const elemento = ref.current;

    const observador = new IntersectionObserver(
      ([entrada]) => {
        if (entrada.isIntersecting) {
          setVisible(true);
          observador.disconnect(); // se anima una sola vez y deja de observar
        }
      },
      { threshold: 0.15 } // aparece cuando se ve el 15% de la sección
    );

    observador.observe(elemento);
    return () => observador.disconnect();
  }, []);

  return (
    <div ref={ref} className={`aparecer ${visible ? "aparecer--visible" : ""}`}>
      {children}
    </div>
  );
}

export default Aparecer;