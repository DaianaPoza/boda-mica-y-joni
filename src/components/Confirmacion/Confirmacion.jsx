import { useState } from "react";
import "./Confirmacion.css";

// ---------- Configuración ----------
// Pegá acá la URL de la implementación de Apps Script (termina en /exec)
const URL_SCRIPT = "https://script.google.com/macros/s/AKfycbxSpC2H7omLc91I9RBcqdpBB5y3qHaROhReafEpx9Ad0Vv9G6_ERsSRBSf1G-pozozj7w/exec";
const FECHA_LIMITE = "5 de diciembre"; // fecha límite para confirmar y abonar
const MAXIMO_PERSONAS = 8; // cuántas personas se pueden elegir como máximo

function Confirmacion() {
  const [nombre, setNombre] = useState("");
  const [asiste, setAsiste] = useState(null); // true | false | null
  const [acompanantes, setAcompanantes] = useState([]); // nombres de los acompañantes
  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState("");
  const [estado, setEstado] = useState("formulario"); // formulario | enviando | enviado

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
      <section className="seccion confirmacion" id="confirmacion">
        <div className="contenedor">
          <p className="titulo-seccion titulo-seccion--claro">Confirmación</p>
          <div className="confirmacion__gracias">
            <h2 className="confirmacion__titulo">
              {asiste ? "¡Gracias por confirmar!" : "¡Gracias por avisarnos!"}
            </h2>
            <p className="confirmacion__texto">
              {asiste
                ? "Recibimos tu respuesta. ¡Nos vemos el 26 de diciembre!"
                : "Te vamos a extrañar. Gracias por tu cariño."}
            </p>
          </div>
        </div>
      </section>
    );
  }

  // ---------- Formulario ----------
  return (
    <section className="seccion confirmacion" id="confirmacion">
      <div className="contenedor">
        <p className="titulo-seccion titulo-seccion--claro titulo-seccion--una-linea">Confirmá tu asistencia</p>
        <h2 className="confirmacion__titulo">¿Nos acompañás?</h2>
        <p className="confirmacion__texto">Nos encantaría que seas parte de este día</p>

        {/* Fecha límite */}
        <p className="confirmacion__limite">
          Confirmá y aboná tu tarjeta antes del <strong>{FECHA_LIMITE}</strong>
        </p>

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