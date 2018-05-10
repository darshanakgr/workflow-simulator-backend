"use strict";
/**
 * The main module that manages the back-end of the system
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const socket_io_1 = __importDefault(require("socket.io"));
const body_parser_1 = __importDefault(require("body-parser"));
const http_1 = __importDefault(require("http"));
const path_1 = __importDefault(require("path"));
const routes_1 = __importDefault(require("./routes"));
const auth_service_1 = require("./services/auth-service");
const socket_controller_1 = __importDefault(require("./controllers/socket-controller"));
const cors_1 = __importDefault(require("cors"));
// initialize the express route handler with socket.io
const app = express_1.default();
const server = http_1.default.createServer(app);
const io = socket_io_1.default(server);
const port = process.env.PORT || 3001;
// create a static route for public folder
app.use(express_1.default.static(path_1.default.join(__dirname, "public")));
app.use(body_parser_1.default.json());
app.use(cors_1.default());
// initialize authentication service
auth_service_1.init(app);
// initialize the router
app.use("/", routes_1.default);
io.on("connection", (socket) => socket_controller_1.default(socket));
// handle react routings
app.get("*", (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
});
// start the server
server.listen(port, () => {
    console.log(`Server is up on ${port}`);
});
// export for testing
exports.default = app;
//# sourceMappingURL=server.js.map