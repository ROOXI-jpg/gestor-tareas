const { Router } = require('express');
const c = require('../controllers/tareas.controller');

const router = Router();
router.post('/', c.crear);
router.get('/', c.listar);
router.patch('/:id/completar', c.completar);
router.delete('/:id', c.eliminar);

module.exports = router;