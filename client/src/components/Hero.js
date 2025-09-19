import React from 'react';

const Hero = ({ onViewProducts }) => {
  return (
    <section className="hero">
      <div className="hero-content">
        <div className="hero-text">
          <h2>Muebles Artesanales de Calidad Superior</h2>
          <p>Más de 30 años creando piezas únicas que combinan tradición artesanal con diseño moderno. Cada mueble cuenta una historia de dedicación y maestría.</p>
          <button className="btn btn-primary" onClick={onViewProducts}>
            Ver Catálogo
          </button>
        </div>
        <div className="hero-image">
          <img 
            src="https://images.pexels.com/photos/1350789/pexels-photo-1350789.jpeg?auto=compress&cs=tinysrgb&w=800" 
            alt="Muebles artesanales de madera" 
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
