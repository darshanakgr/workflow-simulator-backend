/**
 * Initialize the connection with the mongoDB.
 * Set the type promise to global
 * Export the object of mongoose after success initialization.
 */

import mongoose from "mongoose";
import config from "../config";

mongoose.Promise = global.Promise;

/**
 * This function will use an environment variable when it is deployed
 * Otherwise it will use the URI to local database.
 * process.env.MONGODB_URI || "mongodb://localhost:27017/Simulator"
 */

mongoose.connect(config.DB_URI, { useMongoClient: true }).then(() => {
    // console.log("Connected to MongoDB Server");
}).catch((e) => console.log(e));

export { mongoose };