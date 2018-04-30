/**
 * The main module that manages the back-end of the system
 */

import express from "express";
import socketIO from "socket.io";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import http from "http";
import path from "path";
import router from "./routes";
import { init } from "./services/auth-service";
import socketHandler from "./controllers/socket-controller";
import cors from "cors";

// initialize the express route handler with socket.io
const app = express();
const server = http.createServer(app);
const io = socketIO(server);
const port = process.env.PORT || 3001;

// create a static route for public folder
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.json());
app.use(cors());

// initialize authentication service
init(app);

// initialize the router
app.use("/", router);
io.on("connection", (socket) => socketHandler(socket));

// handle react routings
app.get("*", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

// start the server
server.listen(port, () => {
  console.log(`Server is up on ${port}`);
});