import { Fragment } from "react";
import "./Lugares.css";

// Arma un link de búsqueda en Google Maps a partir del nombre del lugar.
// Cuando tengas el link exacto (Compartir → Copiar vínculo en Google Maps),
// reemplazá buscarEnMaps("...") por el link entre comillas.
const buscarEnMaps = (lugar) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(lugar)}`;

// ---------- Datos de cada lugar ----------
const LUGARES = [
  {
    tipo: "Ceremonia",
    hora: "21:00 hs",
    nombre: "Capilla Nuestra Señora de la Merced",
    
    mapa: buscarEnMaps("Capilla Nuestra Señora de la Merced, Christophersen, Santa Fe"),
    icono: "iglesia",
  },
  {
    tipo: "Fiesta",
    hora: "22:00 hs",
    nombre: "Centro Cultural de Christophersen",
   
    mapa: "https://www.google.com/maps/place/Centro+Cultural+Y+Deportivo+Christophersen/@-34.1829212,-62.0280479,17z/data=!4m6!3m5!1s0x95c7cb82681afc91:0x18dbea8bdbd33d11!8m2!3d-34.1830633!4d-62.0268141!16s%2Fg%2F11hbvx29vs?entry=ttu&g_ep=EgoyMDI2MTAwNC4wIKXMDSoASAFQAw%3D%3D",
    icono: "copas",
  },
];

// ---------- Íconos ----------
const ICONOS = {
  iglesia: (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
      <path d="M24 3v7M21.5 5.5h5" />
      <path d="M18 17l6-7 6 7" />
      <path d="M19 17v25M29 17v25" />
      <path d="M19 22l-11 6v14M29 22l11 6v14" />
      <path d="M5 42h38" />
      <path d="M21 42v-6a3 3 0 0 1 6 0v6" />
      <circle cx="24" cy="25" r="2.5" />
      <path d="M12 38v-4a1.5 1.5 0 0 1 3 0v4M33 38v-4a1.5 1.5 0 0 1 3 0v4" />
    </svg>
  ),
  copas: (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
      <g transform="rotate(16 11 43)">
        <path d="M6.5 11h9l-1 14a3.5 3.5 0 0 1-7 0z" />
        <path d="M7.2 17h7.6" />
        <path d="M11 28.5V41M7 41h8" />
      </g>
      <g transform="rotate(-16 37 43)">
        <path d="M32.5 11h9l-1 14a3.5 3.5 0 0 1-7 0z" />
        <path d="M33.2 17h7.6" />
        <path d="M37 28.5V41M33 41h8" />
      </g>
      <path d="M24 3v3.5M19.5 5l1.8 1.8M28.5 5l-1.8 1.8" />
    </svg>
  ),
};

function Lugares() {
  return (
    <section className="seccion lugares">
      <div className="contenedor">
        <p className="titulo-seccion titulo-seccion--claro">¿Dónde y cuándo?</p>

        <div className="lugares__lista">
          {LUGARES.map((lugar, index) => (
            <Fragment key={lugar.tipo}>
              {/* División sutil entre ceremonia y fiesta */}
              {index > 0 && (
                <div className="lugares__divisor">
                  <span>✦</span>
                </div>
              )}

              <article className="lugar">
                <div className="lugar__icono">{ICONOS[lugar.icono]}</div>

                <h3 className="lugar__tipo">{lugar.tipo}</h3>
                <p className="lugar__hora">{lugar.hora}</p>
                <p className="lugar__nombre">{lugar.nombre}</p>
                <p className="lugar__localidad">{lugar.localidad}</p>

                <a
                  className="lugar__boton"
                  href={lugar.mapa}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21z" />
                    <circle cx="12" cy="9.5" r="2.5" />
                  </svg>
                  Cómo llegar
                </a>
              </article>
            </Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Lugares;