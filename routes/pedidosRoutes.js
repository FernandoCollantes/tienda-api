/*
//esta clase os la doy completa. Es la encargada de asignar la ruta al controlador, de esta
forma separamos las responsabilidades→ SOLID→ Principio de responsabilidad.*/
const express = require('express');
const router = express.Router();
const pedidosController = require('../controllers/pedidossController');
router.get('/', pedidosController.obtenerTodos);
router.get('/:id', pedidosController.obtenerPorId);
router.post('/', pedidosController.crear);
router.put('/:id', pedidosController.actualizar);
router.delete('/:id', pedidosController.eliminar);
module.exports = router;
/*Las demás rutas (categoriasRoutes.js, clientesRoutes.js, etc.) tendrán la
misma estructura, cambiando solo los nombres de los controladores.*/