const express = require('express');
const tareasRoutes = require('./routes/tareas.routes');

const app = express();
app.use(express.json());
app.use('/tareas', tareasRoutes);

module.exports = app;