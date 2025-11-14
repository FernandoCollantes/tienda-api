//Clase completa, hacer las demás
const categoriasService = require('../services/categoriasService');
exports.obtenerTodos = (req, res) => {
const categorias = categoriasService.listar();
res.json(categorias);
};

exports.obtenerPorId = (req, res) => {
const categoria = categoriasService.buscarPorId(parseInt(req.params.id));
categoria ? res.json(categoria) : res.status(404).json({ mensaje: 'No encontrado' });
};

//Validar entradas
exports.crear = (req, res) => {
  const { nombre } = req.body;
  
  if (!nombre) {
    return res.status(400).json({ mensaje: 'Falta el campo obligatorio: nombre' });
  }

  const nueva = categoriasService.crear(req.body);
  res.status(201).json(nueva);
};

exports.actualizar = (req, res) => {
const actualizado = categoriasService.actualizar(parseInt(req.params.id), req.body);
actualizado ? res.json(actualizado) : res.status(404).json({ mensaje: 'No encontrado' });
};

exports.eliminar = (req, res) => {
const eliminado = categoriasService.eliminar(parseInt(req.params.id));
eliminado ? res.json(eliminado) : res.status(404).json({ mensaje: 'No encontrado' });
};