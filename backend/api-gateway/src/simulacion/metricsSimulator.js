const eventBus = require('../config/eventBus');
 
const generateMetric = () => {
  const voltage = 110 + Math.random() * 20;
  const current = 1 + Math.random() * 5;
  const power = voltage * current;
  const energy = power / 1000;
  const temperature = 35 + Math.random() * 30;
 
  return {
    device_id: 'esp32_sim',
    voltage: Number(voltage.toFixed(2)),
    current: Number(current.toFixed(2)),
    power: Number(power.toFixed(2)),
    energy: Number(energy.toFixed(3)),
    temperature: Number(temperature.toFixed(1)),
    timestamp: Date.now()
  };
};
 
const startMetricsSimulation = () => {
  console.log('Metrics simulator started');
 
  setInterval(() => {
    const payload = generateMetric();
    console.log('Simulated metric:', payload);
    eventBus.emit('metrics:ready', payload);
  }, 3000);
};
 
module.exports = { startMetricsSimulation };