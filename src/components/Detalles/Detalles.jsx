import { useState } from "react";
import "./Detalles.css";

// ---------- Datos bancarios (reemplazar por los reales) ----------
const CBU = "definir";
const ALIAS = "definir";
const TITULAR = "Nombre Apellido · Banco";

// ---------- Botón para copiar un dato ----------
function CopiarDato({ etiqueta, valor }) {
  const [copiado, setCopiado] = useState(false);

  const copiar = async () => {
    try {
      await navigator.clipboard.writeText(valor);
      setCopiado(true);
      setTimeout(() => setCopiado(false), 2000); // vuelve a "Copiar" a los 2 seg
    } catch {
      alert(`${etiqueta}: ${valor}`); // por si el navegador no permite copiar
    }
  };

  return (
    <div className="dato">
      <div className="dato__texto">
        <span className="dato__etiqueta">{etiqueta}</span>
        <span className="dato__valor">{valor}</span>
      </div>

      <button
        className={`dato__boton ${copiado ? "dato__boton--ok" : ""}`}
        onClick={copiar}
      >
        {copiado ? "¡Copiado!" : "Copiar"}
      </button>
    </div>
  );
}

// ---------- Íconos ----------
const ICONOS = {
  vestido: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 2.5l1 3.5-3 4-2.5 11h15L17 10l-3-4 1-3.5M10 6h4" />
    </svg>
  ),
  regalo: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="8" width="18" height="4" rx="1" />
      <path d="M5 12v9h14v-9M12 8v13M12 8S10 3 7.5 4.5 9 8 12 8zM12 8s2-5 4.5-3.5S15 8 12 8z" />
    </svg>
  ),
  ninos: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="8" cy="6" r="2.5" />
      <circle cx="16.5" cy="8.5" r="2" />
      <path d="M4 21v-6a4 4 0 0 1 8 0v6M13 21v-4.5a3.5 3.5 0 0 1 7 0V21" />
    </svg>
  ),
  tarjeta: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 8a2 2 0 0 0 0 4 2 2 0 0 1 0 4v2h18v-2a2 2 0 0 1 0-4 2 2 0 0 0 0-4V6H3z" />
      <path d="M14 6v12" strokeDasharray="2 2" />
    </svg>
  ),
};

// ---------- Contenido de cada ítem ----------
const ITEMS = [
  {
    id: "dress",
    titulo: "Dress code",
    icono: "vestido",
    contenido: (
      <>
        <p className="detalle__destacado">Formal</p>
        <p className="detalle__nota">¡Vení elegante y con ganas de bailar!</p>
      </>
    ),
  },
  {
    id: "regalo",
    titulo: "Regalo",
    icono: "regalo",
    contenido: (
      <>
        <p className="detalle__texto">
          El mejor regalo es que nos acompañes. <br />Si además querés hacernos un
          presente, podés hacerlo acá:
        </p>
        <CopiarDato etiqueta="CBU" valor={CBU} />
        <CopiarDato etiqueta="Alias" valor={ALIAS} />
        <p className="detalle__nota">Titular: {TITULAR}</p>
      </>
    ),
  },
  {
    id: "ninos",
    titulo: "Niños",
    icono: "ninos",
    contenido: (
      <p className="detalle__texto">
        Es una celebración en familia, por eso <br />   <em>los más chiquitos también
        están invitados</em> a compartir este día con nosotros.
      </p>
    ),
  },
  {
    id: "valor",
    titulo: "Valor de la tarjeta",
    icono: "tarjeta",
    contenido: (
      <>
        <p className="detalle__texto">El valor es por persona:</p>

        <div className="precio">
          <div className="precio__texto">
            <span className="precio__etiqueta">Adultos</span>
            Mayores de 12 años
          </div>
          <span className="precio__valor">$60.000</span>
        </div>

        <div className="precio">
          <div className="precio__texto">
            <span className="precio__etiqueta">Niños</span>
            De 3 a 12 años
          </div>
          <span className="precio__valor">$30.000</span>
        </div>

        <div className="precio">
          <div className="precio__texto">
            <span className="precio__etiqueta">Bebés</span>
            Menores de 3 años
          </div>
          <span className="precio__valor precio__valor--sin-cargo">Sin cargo</span>
        </div>
      </>
    ),
  },
];

function Detalles() {
  // Guarda qué ítems están abiertos (se pueden abrir varios)
  const [abiertos, setAbiertos] = useState([]);

  const alternar = (id) => {
    setAbiertos((actuales) =>
      actuales.includes(id)
        ? actuales.filter((item) => item !== id) // si estaba abierto, lo cierra
        : [...actuales, id] // si estaba cerrado, lo abre
    );
  };

  return (
    <section className="seccion detalles">
      <div className="contenedor">
        <p className="titulo-seccion">Detalles</p>
        <h2 className="detalles__subtitulo">Todo lo que tenés que saber</h2>

        <div className="detalles__separador">
          <span>✦</span>
        </div>

        <div className="detalles__lista">
          {ITEMS.map((item) => {
            const abierto = abiertos.includes(item.id);

            return (
              <div className={`detalle ${abierto ? "detalle--abierto" : ""}`} key={item.id}>
                <button
                  className="detalle__cabecera"
                  onClick={() => alternar(item.id)}
                  aria-expanded={abierto}
                >
                  <span className="detalle__icono">{ICONOS[item.icono]}</span>
                  <span className="detalle__titulo">{item.titulo}</span>
                  <span className="detalle__flecha">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M6 9l6 6 6-6" />
                    </svg>
                  </span>
                </button>

                {/* Contenido desplegable */}
                <div className="detalle__panel">
                  <div className="detalle__contenido">{item.contenido}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Detalles;