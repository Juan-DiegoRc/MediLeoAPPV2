const http = require('http');
const app = require('./app');
const { initializeSocket } = require('./config/socket');

const PORT = process.env.PORT || 3000;

const server = http.createServer(app);

initializeSocket(server);

server.listen(PORT, () => {
  console.log(`API Gateway listening on port ${PORT}`);
});

process.on('SIGINT', () => {
  console.log('\nShutting down server...');
  server.close(() => process.exit(0));
});
