
const productosService = require("../services/productosService");
exports.obtenerTodos = (req, res) => {
  const tipo = req.query.tipo;
  var productos;

  if (tipo == 0 || tipo == null ) {
     productos = productosService.listar();
  } else {
     productos = productosService.listarConCategorias();
  }

  res.json(productos);
};



exports.obtenerPorId = (req, res) => {
const producto = productosService.buscarPorId(parseInt(req.params.id));
producto ? res.json(producto) : res.status(404).json({ mensaje: 'No encontrado' });
};
exports.crear = (req, res) => {
const nuevo = productosService.crear(req.body);
res.status(201).json(nuevo);
};
exports.actualizar = (req, res) => {
const actualizado = productosService.actualizar(parseInt(req.params.id), req.body);
actualizado ? res.json(actualizado) : res.status(404).json({ mensaje: 'No encontrado' });
};
exports.eliminar = (req, res) => {
const eliminado = productosService.eliminar(parseInt(req.params.id));
eliminado ? res.json(eliminado) : res.status(404).json({ mensaje: 'No encontrado' });
};