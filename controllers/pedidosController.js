//Clase completa, hacer las demás
const productosService = require('../services/pedidosService');
exports.obtenerTodos = (req, res) => {
const pedidos = pedidosService.listar();
res.json(pedidos);
};
exports.obtenerPorId = (req, res) => {
const pedido = productosService.buscarPorId(parseInt(req.params.id));
producto ? res.json(pedidos) : res.status(404).json({ mensaje: 'No encontrado' });
};
exports.crear = (req, res) => {
const nuevo = pedidosService.crear(req.body);
res.status(201).json(nuevo);
};
exports.actualizar = (req, res) => {
const actualizado = pedidosService.actualizar(parseInt(req.params.id), req.body);
actualizado ? res.json(actualizado) : res.status(404).json({ mensaje: 'No encontrado' });
};
exports.eliminar = (req, res) => {
const eliminado = pedidosService.eliminar(parseInt(req.params.id));
eliminado ? res.json(eliminado) : res.status(404).json({ mensaje: 'No encontrado' });
};