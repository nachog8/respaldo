import React, { useState, useEffect } from 'react';

const CartDropdown = ({ cart, onUpdateCart }) => {
  const [isOpen, setIsOpen] = useState(false);

  // Formatear precio
  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      minimumFractionDigits: 0
    }).format(price);
  };

  // Obtener total de items
  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  // Obtener total del carrito
  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  // Actualizar cantidad de un producto
  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
      return;
    }

    const updatedCart = cart.map(item =>
      item.id === productId
        ? { ...item, quantity: newQuantity }
        : item
    );
    onUpdateCart(updatedCart);
  };

  // Remover producto del carrito
  const removeFromCart = (productId) => {
    const updatedCart = cart.filter(item => item.id !== productId);
    onUpdateCart(updatedCart);
  };

  // Limpiar carrito
  const clearCart = () => {
    onUpdateCart([]);
  };

  // Proceder al checkout
  const proceedToCheckout = () => {
    if (cart.length === 0) {
      alert('Tu carrito está vacío');
      return;
    }
    alert(`Procediendo al pago por un total de ${formatPrice(getTotalPrice())}`);
    setIsOpen(false);
  };

  // Cerrar dropdown al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isOpen && !event.target.closest('.cart-dropdown-container')) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="cart-dropdown-container">
      <div 
        className="cart-icon"
        onClick={() => setIsOpen(!isOpen)}
        style={{ cursor: 'pointer' }}
      >
        <span className="cart-count">{getTotalItems()}</span>
        🛒
      </div>

      {isOpen && (
        <div className="cart-dropdown">
          <div className="cart-header">
            <div className="cart-title">
              <span className="cart-icon-small">🛒</span>
              <h3>Carrito de Compras ({getTotalItems()})</h3>
            </div>
            <button className="close-cart" onClick={() => setIsOpen(false)}>
              ×
            </button>
          </div>

          {cart.length === 0 ? (
            <div className="cart-empty">
              <p>Tu carrito está vacío</p>
              <button className="btn btn-primary" onClick={() => setIsOpen(false)}>
                Continuar Comprando
              </button>
            </div>
          ) : (
            <>
              <div className="cart-items">
                {cart.map(item => (
                  <div key={item.id} className="cart-item">
                    <img src={item.image} alt={item.name} className="cart-item-image" />
                    <div className="cart-item-info">
                      <h4>{item.name}</h4>
                      <p className="cart-item-price">{formatPrice(item.price)}</p>
                      <div className="cart-item-controls">
                        <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                          -
                        </button>
                        <span>{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="cart-footer">
                <div className="cart-total">
                  <span>Total:</span>
                  <span className="total-price">{formatPrice(getTotalPrice())}</span>
                </div>
                <div className="cart-actions">
                  <button className="btn btn-secondary" onClick={clearCart}>
                    Vaciar
                  </button>
                  <button className="btn btn-primary" onClick={proceedToCheckout}>
                    Comprar
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default CartDropdown;
