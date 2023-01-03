const { createServer } = require("http");
const express = require("express");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const serverHttp = createServer(app);

const io = new Server(serverHttp, {
  cors: {
    header: "*",
  },
});

let username = [];

io.on("connection", (socket) => {
  socket.on("userConnect", (data) => {
    username.push({ id: socket.id, name: data });
    console.log(username);
  });

  socket.on("disconnect", (e) => {
    username = username.filter((usuario) => usuario.id != socket.id);
    console.log("User disconnect");
  });
});

serverHttp.listen(4000, () => console.log("Server on port 4000"));
