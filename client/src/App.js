import React, { useState, useEffect } from 'react';
import './styles/App.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProductList from './components/ProductList';
import ProductDetail from './components/ProductDetail';
import ContactForm from './components/ContactForm';
import Hero from './components/Hero';

function App() {
  const [currentView, setCurrentView] = useState('home');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cart, setCart] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Cargar productos al montar el componente
  useEffect(() => {
    fetchProducts();
  }, []);

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
                  />
                )}
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
        cartItemCount={getCartItemCount()}
        onNavigate={setCurrentView}
        currentView={currentView}
      />
      <main>
        {renderCurrentView()}
      </main>
      <Footer />
    </div>
  );
}

export default App;
