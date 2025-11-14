//Clase completa, hacer las demás
const pedidosService = require('../services/pedidosService');

exports.obtenerTodos = (req, res) => {
const pedidos = pedidosService.listar();
res.json(pedidos);
};


exports.obtenerPorId = (req, res) => {
    const pedido = pedidosService.buscarPorId(parseInt(req.params.id));
    pedido ? res.json(pedidos) : res.status(404).json({ mensaje: 'No encontrado' });
};


exports.crear = (req, res) => {
  const { clienteId, productos, total } = req.body;
  
  if (!clienteId || !productos || !Array.isArray(productos) || productos.length === 0 || !total) {
    return res.status(400).json({ mensaje: 'Faltan campos: clienteId, productos[], total' });
  }

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