import redis from "redis";

const client = redis.createClient();

client.on("connect", () => console.log("Connected to Redis"));
client.on("error", (e) => console.log(`Unable to connect to Redis ${e.message}`));

export default client;