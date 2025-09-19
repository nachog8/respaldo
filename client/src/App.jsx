import React, { useState, useEffect } from 'react';
import './styles/App.css';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import Hero from './components/Hero.jsx';
import ProductList from './components/ProductList.jsx';
import ProductDetail from './components/ProductDetail.jsx';
import ContactForm from './components/ContactForm.jsx';
import CartDropdown from './components/CartDropdown.jsx';
import Notification from './components/Notification.jsx';

function App() {
  const [currentView, setCurrentView] = useState('home');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cart, setCart] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [notification, setNotification] = useState({ message: '', type: 'success' });

  // Cargar productos y carrito al montar el componente
  useEffect(() => {
    fetchProducts();
    loadCartFromStorage();
  }, []);

  // Cargar carrito desde localStorage
  const loadCartFromStorage = () => {
    try {
      const savedCart = localStorage.getItem('reactShoppingCart');
      if (savedCart) {
        setCart(JSON.parse(savedCart));
      }
    } catch (error) {
      console.error('Error loading cart from storage:', error);
    }
  };

  // Guardar carrito en localStorage cuando cambie
  useEffect(() => {
    try {
      localStorage.setItem('reactShoppingCart', JSON.stringify(cart));
    } catch (error) {
      console.error('Error saving cart to storage:', error);
    }
  }, [cart]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/productos');
      const data = await response.json();
      
      if (data.success) {
        setProducts(data.data);
        setError(null);
      } else {
        setError('Error al cargar los productos');
      }
    } catch (err) {
      setError('Error de conexión con el servidor');
      console.error('Error fetching products:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setCurrentView('product-detail');
  };

  const handleAddToCart = (product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
    
    // Mostrar notificación
    setNotification({
      message: `${product.name} agregado al carrito`,
      type: 'success'
    });
  };

  const handleUpdateCart = (updatedCart) => {
    setCart(updatedCart);
  };

  const handleBackToProducts = () => {
    setCurrentView('products');
    setSelectedProduct(null);
  };

  const handleBackToHome = () => {
    setCurrentView('home');
    setSelectedProduct(null);
  };

  const getCartItemCount = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case 'home':
        return (
          <div>
            <Hero onViewProducts={() => setCurrentView('products')} />
            <section className="featured-products">
              <div className="container">
                <h2 className="section-title">Productos Destacados</h2>
                {loading ? (
                  <div className="loading">
                    <div className="loading-spinner"></div>
                    <p>Cargando productos destacados...</p>
                  </div>
                ) : error ? (
                  <div className="error">
                    <p>{error}</p>
                    <button className="btn btn-primary" onClick={fetchProducts}>
                      Reintentar
                    </button>
                  </div>
                ) : (
                  <ProductList
                    products={products.filter(product => product.featured)}
                    onProductClick={handleProductClick}
                    onAddToCart={handleAddToCart}
                  />
                )}
              </div>
            </section>
            <section className="about">
              <div className="container">
                <div className="about-content">
                  <div className="about-text">
                    <h2>Nuestra Historia</h2>
                    <p>La familia Jota ha dedicado más de tres décadas al arte de la carpintería, creando muebles únicos que combinan la robustez de lo artesanal con líneas de diseño moderno.</p>
                    <p>Cada pieza es cuidadosamente elaborada con materiales de la más alta calidad, garantizando durabilidad y belleza que perdura a través del tiempo.</p>
                  </div>
                  <div className="about-image">
                    <img src="https://images.pexels.com/photos/1080721/pexels-photo-1080721.jpeg?auto=compress&cs=tinysrgb&w=600" alt="Taller de carpintería" />
                  </div>
                </div>
              </div>
            </section>
          </div>
        );
      
      case 'products':
        return (
          <section className="products-section">
            <div className="container">
              <div style={{ marginBottom: '2rem' }}>
                <button className="btn btn-secondary" onClick={handleBackToHome}>
                  ← Volver al Inicio
                </button>
              </div>
              <h2 className="section-title">Catálogo de Productos</h2>
              {loading ? (
                <div className="loading">
                  <div className="loading-spinner"></div>
                  <p>Cargando productos...</p>
                </div>
              ) : error ? (
                <div className="error">
                  <p>{error}</p>
                  <button className="btn btn-primary" onClick={fetchProducts}>
                    Reintentar
                  </button>
                </div>
              ) : (
                <ProductList
                  products={products}
                  onProductClick={handleProductClick}
                  onAddToCart={handleAddToCart}
                />
              )}
            </div>
          </section>
        );
      
      case 'product-detail':
        return (
          <ProductDetail
            product={selectedProduct}
            onAddToCart={handleAddToCart}
            onBack={handleBackToProducts}
          />
        );
      
      case 'contact':
        return (
          <section className="contact-section">
            <div className="container">
              <div style={{ marginBottom: '2rem' }}>
                <button className="btn btn-secondary" onClick={handleBackToHome}>
                  ← Volver al Inicio
                </button>
              </div>
              <h2 className="section-title">Contacto</h2>
              <ContactForm />
            </div>
          </section>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="App">
      <Navbar 
        cart={cart}
        onUpdateCart={handleUpdateCart}
        onNavigate={setCurrentView}
        currentView={currentView}
      />
      <main>
        {renderCurrentView()}
      </main>
      <Footer />
      <Notification 
        message={notification.message}
        type={notification.type}
        onClose={() => setNotification({ message: '', type: 'success' })}
      />
    </div>
  );
}

export default App;
