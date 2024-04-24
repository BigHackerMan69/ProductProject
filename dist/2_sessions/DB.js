import redis from 'redis';
// Create a client and connect to Redis server
const url = 'redis://localhost:6379';
const RedisClient = redis.createClient({
    url
});
RedisClient.connect();
export { RedisClient };
//# sourceMappingURL=DB.js.map