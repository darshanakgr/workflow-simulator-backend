/**
 * Initialize the connection with the Redis.io.
 * Export the object of redis-client after success initialization.
 */

import redis from "redis";

/**
 * This function will use an URI to internet redis database.
 */
let client: redis.RedisClient = undefined;

if (process.env.NODE_ENV == "dev" || process.env.NODE_ENV == "test") {
    client = redis.createClient();
} else {
    // client = redis.createClient({
    //     host: "ec2-34-193-123-212.compute-1.amazonaws.com",
    //     url: "redis://h:pd2c7acb80d6c99a31285b71a698ab86867df7eba0b55d3dd3c3d283663c5df44@ec2-34-193-123-212.compute-1.amazonaws.com:21179",
    //     port: 21179,
    //     password: "pd2c7acb80d6c99a31285b71a698ab86867df7eba0b55d3dd3c3d283663c5df44"
    // });
    client = redis.createClient({
        host: process.env.REDIS_HOST,
        url: process.env.REDIS_URL,
        port: parseInt(process.env.REDIS_PORT),
        password: process.env.PASSWORD
    });
}


// client.on("connect", () => console.log("Connected to Redis"));
client.on("error", (e) => console.log(`Unable to connect to Redis ${e.message}`));

export default client;