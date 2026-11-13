const app = require('./app');

// Inicia el servidor solo en localhost
app.listen(3000, '127.0.0.1', () => console.log('Servidor en http://127.0.0.1:3000'));