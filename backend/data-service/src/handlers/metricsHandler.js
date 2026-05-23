const eventBus = require('../events/eventBus');
const influxWriter = require('../data/influxWriter');
const thresholds = require('../config/thresholds');

function setupHandler() {
  eventBus.on('mqtt:metric:received', async (data) => {
    try {
      await influxWriter.writeMetric(data);
      
      const anomalies = [];
      if (data.temperatura > thresholds.temperatura.max) {
        anomalies.push({ field: 'temperatura', value: data.temperatura, threshold: thresholds.temperatura.max, unit: '°C', severity: 'high', message: `Temp ${data.temperatura}°C > ${thresholds.temperatura.max}°C` });
      }
      if (data.corriente > thresholds.corriente.max) {
        anomalies.push({ field: 'corriente', value: data.corriente, threshold: thresholds.corriente.max, unit: 'A', severity: 'critical', message: `Corriente ${data.corriente}A > ${thresholds.corriente.max}A` });
      }

      eventBus.emit('metrics:ready', { success: true, data, anomalies, stored_at: new Date() });
      if (anomalies.length > 0) {
        anomalies.forEach(a => eventBus.emit('alert:new', { type: 'anomaly', ...a, device_id: data.device_id, timestamp: new Date() }));
      }
    } catch (err) {
      console.error(`Error en handler: ${err.message}`);
      eventBus.emit('metrics:ready', { success: false, error: err.message, data });
    }
  });
  console.log('Handler MQTT → InfluxDB → EventBus registrado');
}

module.exports = { setupHandler };