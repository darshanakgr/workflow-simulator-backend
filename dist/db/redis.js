"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
Object.defineProperty(exports, "__esModule", { value: true });
const redis_1 = __importDefault(require("redis"));
const client = redis_1.default.createClient({
    host: "ec2-34-193-123-212.compute-1.amazonaws.com",
    url: "redis://h:pd2c7acb80d6c99a31285b71a698ab86867df7eba0b55d3dd3c3d283663c5df44@ec2-34-193-123-212.compute-1.amazonaws.com:21179",
    port: 21179,
    password: "pd2c7acb80d6c99a31285b71a698ab86867df7eba0b55d3dd3c3d283663c5df44"
});
client.on("connect", () => console.log("Connected to Redis"));
client.on("error", (e) => console.log(`Unable to connect to Redis ${e.message}`));
exports.default = client;
//# sourceMappingURL=redis.js.map