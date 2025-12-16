/*
//esta clase os la doy completa. Es la encargada de asignar la ruta al controlador, de esta
forma separamos las responsabilidades→ SOLID→ Principio de responsabilidad.*/
const express = require('express');
const router = express.Router();
const usuariosController = require('../controllers/usuariosController');
router.get('/', usuariosController.obtenerTodos);
router.get('/:id', usuariosController.obtenerPorId);
router.post('/', usuariosController.crear);
router.put('/:id', usuariosController.actualizar);
router.delete('/:id', usuariosController.eliminar);
module.exports = router;
/*Las demás rutas (categoriasRoutes.js, clientesRoutes.js, etc.) tendrán la
misma estructura, cambiando solo los nombres de los controladores.*/