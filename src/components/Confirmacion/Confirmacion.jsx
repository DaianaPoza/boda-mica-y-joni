
import "./Confirmacion.css";
import { useState, useRef, useEffect } from "react";

// ---------- Configuración ----------
// Pegá acá la URL de la implementación de Apps Script (termina en /exec)
const URL_SCRIPT = "https://script.google.com/macros/s/AKfycbxSpC2H7omLc91I9RBcqdpBB5y3qHaROhReafEpx9Ad0Vv9G6_ERsSRBSf1G-pozozj7w/exec";
const FECHA_LIMITE = "5 de diciembre"; // fecha límite para confirmar y abonar
const MAXIMO_PERSONAS = 8; // cuántas personas se pueden elegir como máximo

const WHATSAPP_VISIBLE = "3462 388391"; // como se lee en la tarjeta
const WHATSAPP_LINK =
  "https://wa.me/5493462388391?text=" +
  encodeURIComponent("¡Hola! Te envío el comprobante de pago de la tarjeta para la boda de Mica y Joni. Mi nombre es: ");







function Confirmacion() {
  const [nombre, setNombre] = useState("");
  const [asiste, setAsiste] = useState(null); // true | false | null
  const [acompanantes, setAcompanantes] = useState([]); // nombres de los acompañantes
  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState("");
  const [estado, setEstado] = useState("formulario"); // formulario | enviando | enviado


  const seccionRef = useRef(null);

  // Cuando se envía, sube suavemente hasta el mensaje de agradecimiento
  useEffect(() => {
    if (estado === "enviado") {
      seccionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [estado]);


  // Cambia la cantidad total sin perder los nombres ya escritos
  const cambiarCantidad = (total) => {
    setAcompanantes((actuales) =>
      Array.from({ length: total - 1 }, (_, i) => actuales[i] || "")
    );
  };

  const cambiarAcompanante = (indice, valor) => {
    setAcompanantes((actuales) => actuales.map((n, i) => (i === indice ? valor : n)));
  };

  // Revisa que esté todo completo
  const validar = () => {
    if (!nombre.trim()) return "Escribí tu nombre y apellido.";
    if (asiste === null) return "Contanos si vas a asistir.";
    const vacio = acompanantes.findIndex((n) => !n.trim());
    if (asiste && vacio !== -1) return `Falta el nombre del acompañante ${vacio + 1}.`;
    return "";
  };

  const enviar = async (e) => {
    e.preventDefault();

    const problema = validar();
    if (problema) {
      setError(problema);
      return;
    }
    setError("");
    setEstado("enviando");

    // Si no asiste, se manda solo a quien confirma
    const datos = {
      nombre: nombre.trim(),
      asiste,
      mensaje: mensaje.trim(),
      acompanantes: asiste ? acompanantes.map((n) => n.trim()) : [],
    };

    try {
      // Sin headers a propósito: así el navegador no bloquea el envío (CORS)
      const respuesta = await fetch(URL_SCRIPT, {
        method: "POST",
        body: JSON.stringify(datos),
      });
      const resultado = await respuesta.json();
      if (!resultado.ok) throw new Error(resultado.error);
      setEstado("enviado");
    } catch {
      setEstado("formulario");
      setError("No pudimos enviar tu respuesta. Probá de nuevo en unos minutos.");
    }
  };

  // ---------- Mensaje final ----------
  if (estado === "enviado") {
    return (
      <section className="seccion confirmacion" id="confirmacion" ref={seccionRef}>
        <div className="contenedor">
          <p className="titulo-seccion titulo-seccion--claro">Confirmación</p>
          <div className="confirmacion__gracias">
          
<h2 className="confirmacion__titulo confirmacion__titulo--gracias">
  {asiste ? "Gracias por confirmar" : "Gracias por avisarnos"}
</h2>

          
{asiste ? (
  <p className="confirmacion__texto">
    Recibimos tu respuesta.
    <br />
    ¡Nos vemos el 26 de diciembre!
  </p>
) : (
  <p className="confirmacion__texto">
    ¡Te vamos a extrañar!
    <br />
    Gracias por tu cariño
  </p>
)}


          </div>
        </div>
      </section>
    );
  }

  // ---------- Formulario ----------
  return (
    <section className="seccion confirmacion" id="confirmacion" ref={seccionRef}>
      <div className="contenedor">
        <p className="titulo-seccion titulo-seccion--claro titulo-seccion--una-linea">Confirmá tu asistencia</p>
        <h2 className="confirmacion__titulo">¿Nos acompañás?</h2>
        <p className="confirmacion__texto">Nos encantaría que seas parte de este día</p>

        {/* Fecha límite */}
        <p className="confirmacion__limite">
          Confirmá y aboná tu tarjeta antes del <strong>{FECHA_LIMITE}</strong>
        </p>


        {/* Pago de la tarjeta y comprobante */}
        <div className="confirmacion__pago">
          <p className="confirmacion__pago-texto">
            Podés abonarla en la <strong>misma cuenta de la sección Regalo</strong> y
            enviar el comprobante de pago por WhatsApp
            
          </p>
          <a
            className="confirmacion__whatsapp"
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path
                fill="currentColor"
                d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.1l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8s-.4-.1-.6.1-.7.8-.8 1-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.2-.4.2-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.8 11.8 0 0 0 4.5 4c1.7.7 2.3.8 3.2.6a2.7 2.7 0 0 0 1.8-1.3 2.2 2.2 0 0 0 .2-1.3c-.1-.1-.3-.2-.5-.3Z"
              />
            </svg>
            Enviar comprobante
          </a>
        </div>




        <form className="formulario" onSubmit={enviar} noValidate>
          {/* Nombre */}
          <label className="campo">
            <span className="campo__etiqueta">Tu nombre y apellido</span>
            <input
              className="campo__input"
              type="text"
              placeholder="Ej.: Laura Gómez"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />
          </label>

          {/* ¿Asiste? */}
          <div className="campo">
            <span className="campo__etiqueta">¿Vas a asistir?</span>
            <div className="opciones">
              <button
                type="button"
                className={`opcion ${asiste === true ? "opcion--activa" : ""}`}
                onClick={() => setAsiste(true)}
              >
                Sí, asistiré
              </button>
              <button
                type="button"
                className={`opcion ${asiste === false ? "opcion--activa" : ""}`}
                onClick={() => setAsiste(false)}
              >
                No podré asistir
              </button>
            </div>
          </div>

          {asiste && (
            <>
              {/* Cantidad */}
              <label className="campo">
                <span className="campo__etiqueta">¿Cuántas personas asistirán en total?</span>
                <span className="campo__ayuda">Incluyéndote a vos</span>
                <select
                  className="campo__input"
                  value={acompanantes.length + 1}
                  onChange={(e) => cambiarCantidad(Number(e.target.value))}
                >
                  {Array.from({ length: MAXIMO_PERSONAS }, (_, i) => i + 1).map((n) => (
                    <option key={n} value={n}>
                      {n === 1 ? "Solo yo" : `${n} personas (yo + ${n - 1})`}
                    </option>
                  ))}
                </select>
              </label>

              {/* Nombres de los acompañantes */}
              {acompanantes.length > 0 && (
                <fieldset className="persona">
                  <legend className="persona__titulo">Tus acompañantes</legend>

                  {acompanantes.map((acompanante, i) => (
                    <label className="campo" key={i}>
                      <span className="campo__etiqueta">Acompañante {i + 1}</span>
                      <input
                        className="campo__input"
                        type="text"
                        placeholder="Nombre y apellido"
                        value={acompanante}
                        onChange={(e) => cambiarAcompanante(i, e.target.value)}
                      />
                    </label>
                  ))}
                </fieldset>
              )}
            </>
          )}

          {/* Mensaje */}
          <label className="campo">
            <span className="campo__etiqueta">Mensaje para los novios</span>
            <span className="campo__ayuda">Opcional</span>
            <textarea
              className="campo__input campo__input--texto"
              placeholder="Escribí unas palabras si querés"
              value={mensaje}
              onChange={(e) => setMensaje(e.target.value)}
            />
          </label>

          {error && <p className="formulario__error">{error}</p>}

          <button className="formulario__boton" type="submit" disabled={estado === "enviando"}>
            {estado === "enviando" ? "Enviando..." : "Confirmar"}
          </button>
        </form>
      </div>
    </section>
  );
}

export default Confirmacion;