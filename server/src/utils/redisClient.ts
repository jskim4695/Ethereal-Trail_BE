import Redis from 'ioredis';
const redisClient = new Redis({
  host: process.env.REDIS_HOST,
  port: parseInt(process.env.REDIS_PORT as string),
});
console.log('Redis URL:', process.env.REDIS_HOST, process.env.REDIS_PORT);

redisClient.on('connect', () => {
  console.log('✅ Redis connected');
});

redisClient.on('error', (err) => {
  console.error('❌ Redis connection error:', err);
});
export default redisClient;
