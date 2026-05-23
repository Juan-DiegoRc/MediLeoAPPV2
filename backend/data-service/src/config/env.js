require('dotenv').config();

const required = ['MQTT_BROKER_URL', 'MQTT_TOPIC', 'INFLUXDB_URL', 'INFLUXDB_TOKEN', 'INFLUXDB_ORG', 'INFLUXDB_BUCKET'];
const missing = required.filter(k => !process.env[k]);
if (missing.length > 0) throw new Error(`Faltan variables de entorno: ${missing.join(', ')}`);

module.exports = {
  mqtt: { brokerUrl: process.env.MQTT_BROKER_URL, topic: process.env.MQTT_TOPIC },
  influx: {
    url: process.env.INFLUXDB_URL,
    token: process.env.INFLUXDB_TOKEN,
    org: process.env.INFLUXDB_ORG,
    bucket: process.env.INFLUXDB_BUCKET
  }
};