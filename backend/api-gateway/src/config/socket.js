const { Server } = require('socket.io');

const eventBus = require('./eventBus');

const {
  addMetric
} = require('../data/metricsStore');

let io;

const initializeSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin:
        process.env.FRONTEND_URL ||
        'http://localhost:5173',
      methods: ['GET', 'POST']
    }
  });

  io.on('connection', (socket) => {
    console.log(
      `⚡ Client connected: ${socket.id}`
    );

    socket.on('disconnect', () => {
      console.log(
        `Client disconnected: ${socket.id}`
      );
    });
  });

  eventBus.on('metrics:ready', (payload) => {
    console.log(
      '📡 metrics:ready received'
    );

    addMetric(payload);

    io.emit('metrics:update', payload);
  });
};

const getIO = () => {
  if (!io) {
    throw new Error(
      'Socket.IO not initialized'
    );
  }

  return io;
};

module.exports = {
  initializeSocket,
  getIO
};