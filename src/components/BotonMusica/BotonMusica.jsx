import "./BotonMusica.css";

function BotonMusica({ sonando, onToggle }) {
  return (
    <button
      className={`boton-musica ${sonando ? "boton-musica--sonando" : ""}`}
      onClick={onToggle}
      aria-label={sonando ? "Pausar música" : "Reproducir música"}
    >
      {sonando ? (
        // Ícono pausa
        <svg viewBox="0 0 24 24" fill="currentColor">
          <rect x="6" y="5" width="4" height="14" rx="1" />
          <rect x="14" y="5" width="4" height="14" rx="1" />
        </svg>
      ) : (
        // Ícono play
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M8 5.5v13a1 1 0 0 0 1.5.85l10.5-6.5a1 1 0 0 0 0-1.7L9.5 4.65A1 1 0 0 0 8 5.5z" />
        </svg>
      )}
    </button>
  );
}

export default BotonMusica;