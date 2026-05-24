require('dotenv').config();

const http = require('http');

const app = require('./src/app');

const { initializeSocket } = require('./src/config/socket');


const requiredEnvVars = [
  'PORT',
  'JWT_SECRET',
  'FRONTEND_URL',
  'MQTT_BROKER_URL',
  'MQTT_TOPIC',
  'INFLUXDB_URL',
  'INFLUXDB_TOKEN',
  'INFLUXDB_ORG',
  'INFLUXDB_BUCKET'
];

const missingEnvVars = requiredEnvVars.filter(
  (envVar) => !process.env[envVar]
);

if (missingEnvVars.length > 0) {
  throw new Error(
    `Faltan variables de entorno: ${missingEnvVars.join(', ')}`
  );
}


const PORT = process.env.PORT || 3000;

const server = http.createServer(app);


initializeSocket(server);

server.listen(PORT, () => {
  console.log('====================================');
  console.log(`Backend running on port ${PORT}`);
  console.log(`Frontend URL: ${process.env.FRONTEND_URL}`);
  console.log(`MQTT Broker: ${process.env.MQTT_BROKER_URL}`);
  console.log(`MQTT Topic: ${process.env.MQTT_TOPIC}`);
  console.log('====================================');
});


process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
});

process.on('unhandledRejection', (reason) => {
  console.error('Unhandled Rejection:', reason);
});