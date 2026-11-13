const servicio = require('../services/tareas.service');

// Obtiene el usuario autenticado desde el encabezado
function usuario(req) {
  return req.header('x-user-id');
}

// Valida que la tarea exista y pertenezca al usuario
function validarPropiedad(req, res) {
  const tarea = servicio.buscar(Number(req.params.id));
  if (!tarea) {
    res.status(404).json({ error: 'Tarea no encontrada' });
    return null;
  }
  if (tarea.usuarioId !== usuario(req)) {
    res.status(403).json({ error: 'No autorizado' });
    return null;
  }
  return tarea;
}

// POST /tareas
function crear(req, res) {
  const { titulo, descripcion } = req.body;
  if (!usuario(req)) return res.status(401).json({ error: 'Usuario requerido' });
  if (!titulo) return res.status(400).json({ error: 'El título es obligatorio' });
  res.status(201).json(servicio.crear(usuario(req), titulo, descripcion));
}

// GET /tareas
function listar(req, res) {
  if (!usuario(req)) return res.status(401).json({ error: 'Usuario requerido' });
  res.json(servicio.listar(usuario(req)));
}

// PATCH /tareas/:id/completar
function completar(req, res) {
  const tarea = validarPropiedad(req, res);
  if (!tarea) return;
  res.json(servicio.completar(tarea.id));
}

// DELETE /tareas/:id
function eliminar(req, res) {
  const tarea = validarPropiedad(req, res);
  if (!tarea) return;
  servicio.eliminar(tarea.id);
  res.status(204).end();
}

module.exports = { crear, listar, completar, eliminar };