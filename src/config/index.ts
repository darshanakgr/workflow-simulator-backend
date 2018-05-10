const config = {
    DB_URI: process.env.MONGODB_URI
};

if (process.env.NODE_ENV == "dev") {
    config.DB_URI = "mongodb://localhost:27017/Simulator";
} else if (process.env.NODE_ENV == "test") {
    config.DB_URI = "mongodb://localhost:27017/SimulatorTest";
}

export default config;
