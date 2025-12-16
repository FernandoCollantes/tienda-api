const express = require('express');
const cors = require('cors');
const app = express();

const fs = require('fs');
const path = require('path');

const dataFolder = path.join(__dirname, 'data');
const jsonFiles = [
  'productos.json',
  'categorias.json',
  'clientes.json',
  'pedidos.json',
  'carritos.json',
  'proveedores.json',
  'usuarios.json'
];

if (!fs.existsSync(dataFolder)) {
  console.log('Carpeta /data no encontrada. Creando carpeta...');
  fs.mkdirSync(dataFolder);
}

jsonFiles.forEach(file => {
  const filePath = path.join(dataFolder, file);
  if (!fs.existsSync(filePath)) {
    console.log(`Archivo ${file} no encontrado. Creándolo vacío...`);
    fs.writeFileSync(filePath, '[]', 'utf-8');
  }
});

app.use(express.json());

// Middleware para registrar todas las peticiones
app.use((req, res, next) => {
console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
next(); // continúa con la siguiente función
});

// Middleware para habilitar JSON
app.use(express.json());
app.use(cors());

// Middleware para habilitar formularios (body en formato URL-encoded)
app.use(express.urlencoded({ extended: true }));





// Importar rutas
app.use('/productos', require('./routes/productosRoutes',));
app.use('/categorias', require('./routes/categoriasRoutes'));
app.use('/carritos', require('./routes/carritosRoutes'));
app.use('/proveedores', require('./routes/proveedoresRoutes'));
app.use('/clientes', require('./routes/clientesRoutes'));
app.use('/pedidos', require('./routes/pedidosRoutes'));
app.use('/usuarios', require('./routes/usuariosRoutes'));



//definir el resto de routes
//Mejora solicitada, guardar en un log de json todas las llamadas a la API
app.listen(3000, () => console.log('Servidor escuchando en http://localhost:3000'));