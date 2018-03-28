import redis from "redis";

const client = redis.createClient({
    host: process.env.REDIS_URL,
    port: 21179,
    password: "pd2c7acb80d6c99a31285b71a698ab86867df7eba0b55d3dd3c3d283663c5df44"
});

client.on("connect", () => console.log("Connected to Redis"));
client.on("error", (e) => console.log(`Unable to connect to Redis ${e.message}`));

export default client;