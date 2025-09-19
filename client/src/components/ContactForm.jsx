import React, { useState } from 'react';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí se implementaría el envío del formulario
    alert('Mensaje enviado correctamente. Te contactaremos pronto.');
    setFormData({
      name: '',
      email: '',
      phone: '',
      message: ''
    });
  };

  return (
    <div className="contact-form-container">
      <div className="contact-info">
        <h3>Información de Contacto</h3>
        <div className="contact-details">
          <div className="contact-item">
            <strong>📧 Email:</strong>
            <p>info@muebleriajota.com</p>
          </div>
          <div className="contact-item">
            <strong>📞 Teléfono:</strong>
            <p>+54 11 1234-5678</p>
          </div>
          <div className="contact-item">
            <strong>📍 Dirección:</strong>
            <p>Av. Principal 123, Buenos Aires, Argentina</p>
          </div>
          <div className="contact-item">
            <strong>🕒 Horarios:</strong>
            <p>Lunes a Viernes: 9:00 - 18:00<br />
            Sábados: 9:00 - 14:00</p>
          </div>
        </div>
      </div>

      <form className="contact-form" onSubmit={handleSubmit}>
        <h3>Envíanos un Mensaje</h3>
        
        <div className="form-group">
          <label htmlFor="name">Nombre Completo *</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email *</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="phone">Teléfono</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="message">Mensaje *</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows="5"
            required
            placeholder="Cuéntanos sobre tu proyecto o consulta..."
          ></textarea>
        </div>

        <button type="submit" className="btn btn-primary">
          Enviar Mensaje
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
