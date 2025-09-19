const express = require('express');
const cors = require('cors');
const requestLogger = require('./middleware/logger');
const productRoutes = require('./routes/productRoutes');

const app = express();
const PORT = process.env.PORT || 3001;

// Middlewares globales
app.use(cors()); // Habilitar CORS para el frontend
app.use(express.json()); // Para procesar JSON en las peticiones
app.use(requestLogger); // Middleware de logging personalizado

// Rutas de la API
app.use('/api/productos', productRoutes);

// Ruta de prueba
app.get('/', (req, res) => {
    res.json({
        message: 'API de Mueblería Hermanos Jota',
        version: '1.0.0',
        endpoints: {
            productos: '/api/productos',
            productoPorId: '/api/productos/:id',
            productosDestacados: '/api/productos/featured',
            buscarProductos: '/api/productos/search?q=termino'
        }
    });
});

// Manejador para rutas no encontradas (404)
app.use('*', (req, res) => {
    res.status(404).json({
        success: false,
        message: 'Ruta no encontrada',
        path: req.originalUrl
    });
});

// Manejador de errores centralizado
app.use((error, req, res, next) => {
    console.error('Error:', error);
    
    res.status(500).json({
        success: false,
        message: 'Error interno del servidor',
        error: process.env.NODE_ENV === 'development' ? error.message : 'Algo salió mal'
    });
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
    console.log(`📋 API disponible en http://localhost:${PORT}/api/productos`);
    console.log(`🔍 Buscar productos: http://localhost:${PORT}/api/productos/search?q=mesa`);
});

module.exports = app;
