const proveedoresService = require('../services/proveedoresService');

exports.obtenerTodos = (req, res) => {
const proveedores = proveedoresService.listar();
res.json(proveedores);
};

exports.obtenerPorId = (req, res) => {
const producto = proveedoresService.buscarPorId(parseInt(req.params.id));
producto ? res.json(producto) : res.status(404).json({ mensaje: 'No encontrado' });
};

exports.crear = (req, res) => {
  const { nombre, pais } = req.body;

  if (!nombre || !pais) {
    return res.status(400).json({ mensaje: 'Faltan campos: nombre, pais' });
  }

  const nuevo = proveedoresService.crear(req.body);
  res.status(201).json(nuevo);
};

exports.actualizar = (req, res) => {
const actualizado = proveedoresService.actualizar(parseInt(req.params.id), req.body);
actualizado ? res.json(actualizado) : res.status(404).json({ mensaje: 'No encontrado' });
};

exports.eliminar = (req, res) => {
const eliminado = proveedoresService.eliminar(parseInt(req.params.id));
eliminado ? res.json(eliminado) : res.status(404).json({ mensaje: 'No encontrado' });
};