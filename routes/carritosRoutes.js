
const express = require('express');
const router = express.Router();
const carritosController = require('../controllers/carrritosController');
router.get('/', carritosController.obtenerTodos);
router.get('/:id', carritosController.obtenerPorId);
router.post('/', carritosController.crear);
router.put('/:id', carritosController.actualizar);
router.delete('/:id', carritosController.eliminar);
module.exports = router;

