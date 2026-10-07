import "./Hero.css";

function Hero({ foto }) {
  return (
    <header className="hero">
      {/* Foto: si todavía no está, muestra un fondo oliva */}
      <div
        className={`hero__foto ${foto ? "" : "hero__foto--vacia"}`}
        style={foto ? { backgroundImage: `url(${foto})` } : undefined}
      />

      <div className="hero__banda">
        <p className="hero__titulo">¡Nos casamos!</p>
        <h2 className="hero__nombres">Mica y Joni</h2>

        <div className="hero__separador">
          <span>✦</span>
        </div>

        <p className="hero__fecha">26 · 12 · 2026</p>
      </div>
    </header>
  );
}

export default Hero;