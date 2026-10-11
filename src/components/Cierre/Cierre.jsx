import "./Cierre.css";

function Cierre({ foto }) {
  return (
    <footer className="cierre">
      {/* Foto con los bordes fundidos en el fondo crema */}
      <div className="cierre__foto" style={{ backgroundImage: `url(${foto})` }} />

      {/* Texto sobre la parte difuminada de la foto */}
      <div className="cierre__contenido">
        
        <p className="cierre__texto">
          El amor crece cuando se comparte... <br /> ¡Gracias por ser parte de nuestras vidas!
        </p>
        <p className="cierre__firma">Mica y Joni · 26.12.2026</p>
      </div>
    </footer>
  );
}

export default Cierre;