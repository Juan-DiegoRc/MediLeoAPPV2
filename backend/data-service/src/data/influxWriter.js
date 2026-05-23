const { InfluxDB, Point } = require('@influxdata/influxdb-client');
const config = require('../config/env');

class InfluxWriter {
  constructor() { this.client = null; this.writeApi = null; this.queryApi = null; this.isConnected = false; }

  async connect() {
    this.client = new InfluxDB({ url: config.influx.url, token: config.influx.token });
    this.writeApi = this.client.getWriteApi(config.influx.org, config.influx.bucket, 'ns');
    this.queryApi = this.client.getQueryApi(config.influx.org);
    this.isConnected = true;
    console.log(`InfluxDB conectado: ${config.influx.bucket}`);
  }

  async writeMetric(data) {
    if (!this.isConnected) throw new Error('InfluxDB no conectado');
    const point = new Point('energy_metrics')
      .tag('device_id', data.device_id)
      .floatField('corriente', data.corriente).floatField('voltaje', data.voltaje)
      .floatField('temperatura', data.temperatura).floatField('potencia', data.potencia).floatField('energia', data.energia)
      .timestamp(data.timestamp);
    this.writeApi.writePoint(point);
    await this.writeApi.flush();
  }

  async getRecentMetrics(deviceId = 'esp32_main', limit = 10) {
    const query = `from(bucket:"${config.influx.bucket}") |> range(start:-24h) |> filter(fn:(r)=> r._measurement=="energy_metrics" and r.device_id=="${deviceId}") |> filter(fn:(r)=> r._field=="corriente" or r._field=="voltaje" or r._field=="temperatura" or r._field=="potencia" or r._field=="energia") |> pivot(rowKey:["_time"], columnKey: ["_field"], valueColumn: "_value") |> sort(columns:["_time"], desc:true) |> limit(n:${limit})`;
    const results = [];
    return new Promise((resolve, reject) => {
      this.queryApi.queryRows(query, {
        next(row, tableMeta) { results.push(tableMeta.toObject(row)); },
        error: reject,
        complete: () => resolve(results.map(r => ({
          timestamp: new Date(r._time), device_id: r.device_id, corriente: r.corriente, voltaje: r.voltaje, temperatura: r.temperatura, potencia: r.potencia, energia: r.energia
        })))
      });
    });
  }

  async getAggregatedMetrics({ deviceId, start = '-24h', end = 'now' }) {
    const query = `
      from(bucket:"${config.influx.bucket}") |> range(start:${start}, stop:${end}) |> filter(fn:(r)=> r._measurement=="energy_metrics" and r.device_id=="${deviceId}")
      |> aggregateWindow(every: 1m, fn: mean, createEmpty: false) |> yield(name:"mean")
      |> aggregateWindow(every: 1m, fn: max, createEmpty: false) |> yield(name:"max")
      |> aggregateWindow(every: 1m, fn: min, createEmpty: false) |> yield(name:"min")
    `;
    return new Promise(resolve => resolve({ avg: {}, max: {}, min: {} })); 
  }

  async getDailySummary(deviceId, date = new Date()) {
    const start = new Date(date); start.setUTCHours(0,0,0,0);
    const end = new Date(date); end.setUTCHours(23,59,59,999);
    const query = `from(bucket:"${config.influx.bucket}") |> range(start:${start.toISOString()}, stop:${end.toISOString()}) |> filter(fn:(r)=> r._measurement=="energy_metrics" and r.device_id=="${deviceId}" and r._field=="potencia") |> aggregateWindow(every: 1h, fn: mean, createEmpty: false)`;
    const results = [];
    return new Promise(resolve => {
      this.queryApi.queryRows(query, { next: (r, m) => results.push(m.toObject(r)), error: console.error, complete: () => resolve(results) });
    });
  }

  async close() { if (this.writeApi) await this.writeApi.close(); this.isConnected = false; console.log('InfluxDB cerrado'); }
}

module.exports = new InfluxWriter();