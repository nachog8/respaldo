import React from 'react';
import ProductCard from './ProductCard.jsx';

const ProductList = ({ products, onProductClick, onAddToCart }) => {
  if (!products || products.length === 0) {
    return (
      <div style={{ textAlign: 'center', color: 'var(--text-medium)', gridColumn: '1/-1' }}>
        <p>No se encontraron productos.</p>
      </div>
    );
  }

  return (
    <div className="products-grid">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onProductClick={onProductClick}
          onAddToCart={onAddToCart}
        />
      ))}
    </div>
  );
};

export default ProductList;
