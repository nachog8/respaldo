import React, { useState, useEffect } from 'react';

const Notification = ({ message, type = 'success', duration = 3000, onClose }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (message) {
      setIsVisible(true);
      const timer = setTimeout(() => {
        setIsVisible(false);
        setTimeout(() => onClose && onClose(), 300); // Esperar a que termine la animación
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [message, duration, onClose]);

  if (!message) return null;

  const getNotificationStyle = () => {
    const baseStyle = {
      position: 'fixed',
      top: '20px',
      right: '20px',
      padding: '1rem 1.5rem',
      borderRadius: 'var(--radius-md)',
      boxShadow: 'var(--shadow-lg)',
      zIndex: 10000,
      maxWidth: '300px',
      transform: isVisible ? 'translateX(0)' : 'translateX(100%)',
      transition: 'transform 0.3s ease',
      fontFamily: 'var(--font-secondary)',
      fontWeight: '500',
      color: 'white',
      display: 'flex',
      alignItems: 'center',
      gap: 'var(--spacing-sm)'
    };

    if (type === 'success') {
      return {
        ...baseStyle,
        backgroundColor: 'var(--success-color)'
      };
    } else if (type === 'error') {
      return {
        ...baseStyle,
        backgroundColor: 'var(--error-color)'
      };
    }

    return baseStyle;
  };

  return (
    <div style={getNotificationStyle()}>
      <span style={{
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        borderRadius: '50%',
        width: '24px',
        height: '24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '0.8rem',
        fontWeight: 'bold'
      }}>
        {type === 'success' ? '✓' : '⚠'}
      </span>
      <span>{message}</span>
    </div>
  );
};

export default Notification;
