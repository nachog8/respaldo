import React, { useState } from 'react';

const Navbar = ({ cartItemCount, onNavigate, currentView }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleNavClick = (view) => {
    onNavigate(view);
    setIsMenuOpen(false);
  };

  return (
    <header className="header">
      <nav className="nav">
        <div className="nav-container">
          <div className="nav-logo">
            <h1 onClick={() => handleNavClick('home')} style={{ cursor: 'pointer' }}>
              Mueblería<br /><span>Hermanos Jota</span>
            </h1>
          </div>
          
          <ul className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
            <li>
              <button 
                className={`nav-link ${currentView === 'home' ? 'active' : ''}`}
                onClick={() => handleNavClick('home')}
              >
                Inicio
              </button>
            </li>
            <li>
              <button 
                className={`nav-link ${currentView === 'products' ? 'active' : ''}`}
                onClick={() => handleNavClick('products')}
              >
                Productos
              </button>
            </li>
            <li>
              <button 
                className={`nav-link ${currentView === 'contact' ? 'active' : ''}`}
                onClick={() => handleNavClick('contact')}
              >
                Contacto
              </button>
            </li>
          </ul>
          
          <div className="nav-cart">
            <div className="cart-icon">
              <span className="cart-count">{cartItemCount}</span>
              🛒
            </div>
          </div>
          
          <div 
            className="nav-toggle"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
