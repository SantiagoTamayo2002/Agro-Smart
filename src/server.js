import { createApp } from './app.js';
import { env } from './config/env.js';
import { pool } from './db/pool.js';
import { iniciarMqtt, cerrarMqtt } from './mqtt/client.js';

const app = createApp();

// Prioriza el PORT de Azure (8080), si no existe usa el configurado en tu env local (4000)
const PORT = process.env.PORT || env.port;

const server = app.listen(PORT, () => {
  console.log(`AgroSmart API escuchando en el puerto: ${PORT}`);
  console.log(`Entorno: ${env.nodeEnv}`);
});

iniciarMqtt();

// Cierre ordenado
async function shutdown(signal) {
  console.log(`\n${signal} recibido. Cerrando servidor...`);
  server.close(async () => {
    await cerrarMqtt();
    await pool.end();
    console.log('Conexiones cerradas. Adios.');
    process.exit(0);
  });
}

process.on('SIGINT', () => shutdown('SIGINT'));
process.on('SIGTERM', () => shutdown('SIGTERM'));