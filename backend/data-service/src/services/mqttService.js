const mqtt = require('mqtt');
const eventBus = require('../events/eventBus');
const config = require('../config/env');

class MqttService {
  constructor() { this.client = null; this.isConnected = false; }

  async connect() {
    return new Promise((resolve, reject) => {
      this.client = mqtt.connect(config.mqtt.brokerUrl, { clientId: `iot-be-${Date.now()}`, reconnectPeriod: 2000, clean: true });
      
      this.client.on('connect', () => {
        this.isConnected = true;
        console.log(`MQTT conectado a ${config.mqtt.brokerUrl}`);
        this.subscribe();
        resolve();
      });
      this.client.on('error', err => { console.error(`MQTT Error: ${err.message}`); eventBus.emit('error', { source: 'mqtt', error: err }); });
      this.client.on('close', () => { this.isConnected = false; console.log('MQTT desconectado'); });
      
      this.client.on('message', (topic, payload) => {
        if (topic === config.mqtt.topic) this.handleMessage(payload);
      });
    });
  }

  subscribe() {
    this.client.subscribe(config.mqtt.topic, { qos: 1 }, err => {
      if (err) return console.error(`Error suscribiéndose: ${err.message}`);
      console.log(`📡 Suscrito a: ${config.mqtt.topic}`);
    });
  }

  handleMessage(payload) {
    try {
      const data = JSON.parse(payload.toString());
      const required = ['device_id', 'corriente', 'voltaje', 'temperatura', 'potencia', 'energia', 'timestamp'];
      const missing = required.filter(f => !(f in data) || typeof data[f] === 'undefined');
      if (missing.length > 0) return console.warn(` Payload inválido. Faltan: ${missing.join(', ')}`);

      const parsed = {
        device_id: String(data.device_id).trim(),
        corriente: Number(data.corriente), voltaje: Number(data.voltaje), temperatura: Number(data.temperatura),
        potencia: Number(data.potencia), energia: Number(data.energia),
        timestamp: new Date(data.timestamp * 1000), received_at: new Date()
      };
      console.log(`Métrica recibida: ${parsed.device_id} | ${parsed.potencia}W`);
      eventBus.emit('mqtt:metric:received', parsed);
    } catch (err) { console.error(`Error parseando payload: ${err.message}`); }
  }

  async disconnect() { if (this.client && this.isConnected) this.client.end(false, {}, () => console.log('MQTT cerrado')); }
}

module.exports = new MqttService();