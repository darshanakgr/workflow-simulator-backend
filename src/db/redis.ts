import redis from "redis";

const client = redis.createClient({
    host: process.env.REDIS_URL || "127.0.0.1"
});

client.on("connect", () => console.log("Connected to Redis"));
client.on("error", (e) => console.log(`Unable to connect to Redis ${e.message}`));

export default client;