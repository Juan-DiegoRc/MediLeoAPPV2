const mqttService = require('./services/mqttService');
const influxWriter = require('./data/influxWriter');
const eventBus = require('./events/eventBus');
const { setupHandler } = require('./handlers/metricsHandler');

async function bootstrap() {
  try {
    console.log(' Iniciando IoT Energy Monitor Backend...');
    
    await influxWriter.connect();
    await mqttService.connect();
    setupHandler();

    eventBus.on('metrics:ready', (payload) => {
      if (payload.success) console.log(` Métrica almacenada: ${payload.data.device_id}`);
    });
    eventBus.on('alert:new', (alert) => console.warn(` ALERTA [${alert.severity}]: ${alert.message}`));
    eventBus.on('error', ({ source, error }) => console.error(`Error en ${source}: ${error.message}`));

    process.on('SIGINT', async () => {
      console.log('\n Cerrando servicios...');
      await mqttService.disconnect();
      await influxWriter.close();
      process.exit(0);
    });

  } catch (err) {
    console.error(`Fallo crítico al iniciar: ${err.message}`);
    process.exit(1);
  }
}

bootstrap();