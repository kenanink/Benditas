// server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;

// Middlewares
app.use(cors()); // permite llamadas desde el frontend
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas
const indexRoutes = require('./routes/index');
app.use('/', indexRoutes);

// Error 404 simple
app.use((req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada' });
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
