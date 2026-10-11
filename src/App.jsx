import { useState, useEffect, useRef } from "react";

// ---------- Componentes ----------
import Portada from "./components/Portada/Portada";
import Hero from "./components/Hero/Hero";
import CuentaRegresiva from "./components/CuentaRegresiva/CuentaRegresiva";
import Lugares from "./components/Lugares/Lugares";
import Detalles from "./components/Detalles/Detalles";
import Confirmacion from "./components/Confirmacion/Confirmacion";
import Cierre from "./components/Cierre/Cierre";
import Aparecer from "./components/Aparecer/Aparecer";
import BotonMusica from "./components/BotonMusica/BotonMusica";

// ---------- Fotos y música ----------
import fotoPortada from "./assets/img/foto-portada.webp";
import fotoPortadaHorizontal from "./assets/img/foto-portada-horizontal.webp";
import fotoHero from "./assets/img/foto-hero.webp";
import fotoCierre from "./assets/img/foto-cierre.webp";
import cancion from "./assets/musica/cancion.mp3";

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
      <audio
        ref={audioRef}
        src={cancion}
        loop
        onPlay={() => setSonando(true)}
        onPause={() => setSonando(false)}
      />

      {!ingreso && (
        <Portada
          onIngresar={handleIngresar}
          foto={fotoPortada}
          fotoHorizontal={fotoPortadaHorizontal}
        />
      )}

      {ingreso && (
        <main>
          <Hero foto={fotoHero} />

          {/* Cada sección aparece al scrollear */}
          <Aparecer>
            <CuentaRegresiva />
          </Aparecer>

          <Aparecer>
            <Lugares />
          </Aparecer>

          <Aparecer>
            <Detalles />
          </Aparecer>

          <Aparecer>
            <Confirmacion />
          </Aparecer>

          <Aparecer>
            <Cierre foto={fotoCierre} />
          </Aparecer>

          {/* Fuera de <Aparecer> para que quede siempre fijo en pantalla */}
          <BotonMusica sonando={sonando} onToggle={toggleMusica} />
        </main>
      )}
    </>
  );
}

export default App;
