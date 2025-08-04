const express = require('express');
const path = require('path');
const app = express();

// Sirve archivos estáticos desde la carpeta dist bajo la ruta /modelo-verde
app.use('/modelo-verde', express.static(path.join(__dirname, 'dist')));

// Solo redirige al index.html si la ruta NO incluye "/assets"
app.get('/modelo-verde/*', (req, res) => {
  if (req.path.includes('/assets/')) {
    res.status(404).send('Asset no encontrado'); // Evita servir HTML en vez de JS
  } else {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`🚀 Servidor corriendo en el puerto ${port}`);
});
