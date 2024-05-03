const Redis = require('ioredis');

const redisClient = new Redis({
  host: 'localhost',
  port: 6379,
});

redisClient.on('error', (err) => {
  console.error('Error connecting to Redis:', err);
});

redisClient.on('ready', () => {
  console.log('Connected to Redis successfully!');
});

module.exports = redisClient;