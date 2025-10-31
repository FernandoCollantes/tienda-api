const express = require('express');
const app = express();
app.use(express.json());
// Importar rutas
app.use('/productos', require('./routes/productosRoutes',));
/*app.use('/categorias', require('./routes/categoriasRoutes'));
app.use('/carritos', require('./routes/carritosRoutes'));
app.use('/proveedores', require('./routes/proveedoresRoutes'));
app.use('/clientes', require('./routes/clientesRoutes'));
app.use('/pedidos', require('./routes/pedidosRoutes'));
*/



//definir el resto de routes
//Mejora solicitada, guardar en un log de json todas las llamadas a la API
app.listen(3000, () => console.log('Servidor escuchando en http://localhost:3000'));