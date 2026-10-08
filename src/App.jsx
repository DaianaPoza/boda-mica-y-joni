import { useState, useEffect, useRef } from "react";
import Portada from "./components/Portada/Portada";
import Hero from "./components/Hero/Hero";
import BotonMusica from "./components/BotonMusica/BotonMusica";
import cancion from "./assets/musica/cancion.mp3";
import CuentaRegresiva from "./components/CuentaRegresiva/CuentaRegresiva";
import Lugares from "./components/Lugares/Lugares";
import Detalles from "./components/Detalles/Detalles";
import Confirmacion from "./components/Confirmacion/Confirmacion";

// ---------- Archivos (descomentá cuando los tengas) ----------
// import fotoPortada from "./assets/img/foto-portada.jpg";
// import fotoHero from "./assets/img/foto-hero.jpg";

// Próximos componentes:
// import Fecha from "./components/Fecha/Fecha";




// import Cierre from "./components/Cierre/Cierre";

function App() {
  const [ingreso, setIngreso] = useState(false);
  const [sonando, setSonando] = useState(false);
  const audioRef = useRef(null);

  // Mientras se ve la portada, no se puede scrollear
  useEffect(() => {
    document.body.classList.toggle("sin-scroll", !ingreso);
  }, [ingreso]);

  const reproducir = () => {
    audioRef.current?.play().catch(() => {});
  };

  const handleIngresar = () => {
    setIngreso(true);
    reproducir(); // la música arranca al tocar "Ingresar"
  };

  const toggleMusica = () => {
    if (sonando) {
      audioRef.current?.pause();
    } else {
      reproducir();
    }
  };

  return (
    <>
      {/* Audio: loop = se repite al terminar */}
      {cancion && (
        <audio
          ref={audioRef}
          src={cancion}
          loop
          onPlay={() => setSonando(true)}
          onPause={() => setSonando(false)}
        />
      )}

      {!ingreso && (
        <Portada
          onIngresar={handleIngresar}
          // foto={fotoPortada}
        />
      )}

      {ingreso && (
        <main>
          <Hero
          // foto={fotoHero}
          />
           <CuentaRegresiva /> 
          <Lugares />
          <Detalles /> 
          <Confirmacion /> 
          {/* <Cierre /> */}

          <BotonMusica sonando={sonando} onToggle={toggleMusica} />
        </main>
      )}
    </>
  );
}

export default App;
