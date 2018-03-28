import express from "express";
import socketIO from "socket.io";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import http from "http";
import path from "path";
import router from "./routes";
import authService from "./services/auth-service";
import socketHandler from "./controllers/socket-controller";
import cors from "cors";

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.json());
// app.use(cookieParser());
app.use(cors());

authService.init(app);

app.use("/", router);

io.on("connection", (socket) => socketHandler(socket));

app.get("*", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

server.listen(3001, () => {
  const date = new Date();
  console.log(`${date.getHours()} : ${date.getMinutes()} : ${date.getSeconds()}`);
  console.log("Server is up on 3001");
});