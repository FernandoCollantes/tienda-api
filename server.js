const express = require('express');
const app = express();
app.use(express.json());
// Importar rutas
app.use('/api/productos', require('./routes/productosRoutes',));
app.use('/api/categorias', require('./routes/categoriasRoutes'));
app.use('/api/carritos', require('./routes/carritosRoutes'));
app.use('/api/proveedores', require('./routes/proveedoresRoutes'));
app.use('/api/clientes', require('./routes/clientesRoutes'));
app.use('/api/pedidos', require('./routes/pedidosRoutes'));

/*
app.use('/api/productos', require('./services/productosService',));
app.use('/api/categorias', require('./services/categoriasService'));
app.use('/api/carritos', require('./services/carritosService'));
app.use('/api/proveedores', require('./services/proveedoresService'));
app.use('/api/clientes', require('./services/clientesService'));
app.use('/api/pedidos', require('./services/pedidosService'));


app.use('/api/productos', require('./controllers/productosController',));
app.use('/api/categorias', require('./controllers/categoriasController'));
app.use('/api/carritos', require('./controllers/carritosController'));
app.use('/api/proveedores', require('./controllers/proveedoresController'));
app.use('/api/clientes', require('./controllers/clientesController'));
app.use('/api/pedidos', require('./controllers/pedidosController'));
*/





//definir el resto de routes
//Mejora solicitada, guardar en un log de json todas las llamadas a la API
app.listen(3000, () => console.log('Servidor escuchando en http://localhost:3000'));