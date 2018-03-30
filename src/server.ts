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

const app = express();
const server = http.createServer(app);
const io = socketIO(server);
const port = process.env.PORT || 3001;

app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.json());
app.use(cors());

init(app);

app.use("/", router);

io.on("connection", (socket) => socketHandler(socket));

app.get("*", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

server.listen(port, () => {
  console.log(`Server is up on ${port}`);
});