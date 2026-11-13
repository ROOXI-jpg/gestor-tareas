let tareas = [];
let siguienteId = 1;

// Crea una tarea asociada al usuario
function crear(usuarioId, titulo, descripcion = '') {
  const tarea = { id: siguienteId++, usuarioId, titulo, descripcion, completada: false };
  tareas.push(tarea);
  return tarea;
}

// Lista las tareas del usuario
function listar(usuarioId) {
  return tareas.filter(t => t.usuarioId === usuarioId);
}

// Busca una tarea por id
function buscar(id) {
  return tareas.find(t => t.id === id);
}

// Marca una tarea como completada
function completar(id) {
  const tarea = buscar(id);
  tarea.completada = true;
  return tarea;
}

// Elimina una tarea
function eliminar(id) {
  tareas = tareas.filter(t => t.id !== id);
}

// Reinicia los datos (solo para pruebas)
function reiniciar() {
  tareas = [];
  siguienteId = 1;
}

module.exports = { crear, listar, buscar, completar, eliminar, reiniciar };