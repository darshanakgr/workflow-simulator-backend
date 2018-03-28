"use strict";
/**
 * Initialize the connection with the mongoDB.
 * Set the type promise to global
 * Export the object of mongoose after success initialization.
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
exports.mongoose = mongoose_1.default;
mongoose_1.default.Promise = global.Promise;
/**
 * This function will use an environment variable when it is deployed
 * Otherwise it will use the URI to local database.
 */
mongoose_1.default.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/Simulator", { useMongoClient: true }).then(() => {
    console.log("Connected to MongoDB Server");
}).catch((e) => console.log(e));
//# sourceMappingURL=db-connection.js.map