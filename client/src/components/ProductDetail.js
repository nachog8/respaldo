import React from 'react';

const ProductDetail = ({ product, onAddToCart, onBack }) => {
  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      minimumFractionDigits: 0
    }).format(price);
  };

  if (!product) {
    return (
      <div className="container">
        <div className="error">
          <p>Producto no encontrado</p>
          <button className="btn btn-primary" onClick={onBack}>
            Volver a Productos
          </button>
        </div>
      </div>
    );
  }

  return (
    <section className="product-detail">
      <div className="container">
        <div className="breadcrumb">
          <button className="btn btn-secondary" onClick={onBack}>
            ← Volver a Productos
          </button>
        </div>
        
        <div className="product-container">
          <div className="product-detail-content">
            <div className="product-detail-image">
              <img src={product.image} alt={product.name} />
            </div>
            
            <div className="product-detail-info">
              <h1>{product.name}</h1>
              <div className="product-detail-price">
                {formatPrice(product.price)}
              </div>
              <p className="product-detail-description">
                {product.description}
              </p>
              
              <div className="product-specs">
                <h3>Especificaciones</h3>
                <ul>
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <li key={key}>
                      <span>{key}:</span>
                      <span>{value}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <button 
                className="btn btn-primary add-to-cart-btn"
                onClick={() => onAddToCart(product)}
              >
                Añadir al Carrito
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetail;
