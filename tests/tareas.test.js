const request = require('supertest');
const app = require('../src/app');
const servicio = require('../src/services/tareas.service');

beforeEach(() => servicio.reiniciar());

test('crea una tarea', async () => {
  const res = await request(app).post('/tareas').set('x-user-id', 'u1').send({ titulo: 'Estudiar' });
  expect(res.status).toBe(201);
});

test('lista solo las tareas del usuario', async () => {
  await request(app).post('/tareas').set('x-user-id', 'u1').send({ titulo: 'A' });
  await request(app).post('/tareas').set('x-user-id', 'u2').send({ titulo: 'B' });
  const res = await request(app).get('/tareas').set('x-user-id', 'u1');
  expect(res.body).toHaveLength(1);
});

test('completa una tarea propia', async () => {
  await request(app).post('/tareas').set('x-user-id', 'u1').send({ titulo: 'A' });
  const res = await request(app).patch('/tareas/1/completar').set('x-user-id', 'u1');
  expect(res.body.completada).toBe(true);
});

test('no permite eliminar tareas de otro usuario', async () => {
  await request(app).post('/tareas').set('x-user-id', 'u1').send({ titulo: 'A' });
  const res = await request(app).delete('/tareas/1').set('x-user-id', 'u2');
  expect(res.status).toBe(403);
});