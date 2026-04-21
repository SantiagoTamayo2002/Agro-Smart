
//------------------------------------------------------------------------
// constantes de configuración
const xpress = require('express');
const cors   = require('cors');
const app    = xpress();

// -------------------------------------------------------------------------



app.use(cors());
app.use(xpress.json());



app.listen(3000, () => {
    console.log('Servidor backend de Agro-Smart escuchando en el puerto 3000');
});

// Rutas
app.get('/', (req, res) => {
    res.send('¡Hola desde el backend de Agro-Smart!');
});