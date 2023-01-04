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

  socket.on("newMessage", (data) => {
    const destino = username.filter((usuario) => usuario.name === data.para);
    const mensaje = {
      id: data.id,
      desde: data.name,
      msg: data.mensaje,
    };
    if (destino.length) return io.to(destino[0].id).emit("newMensaje", mensaje);
    return;
  });

  socket.on("disconnect", (e) => {
    username = username.filter((usuario) => usuario.id != socket.id);
    console.log("User disconnect");
  });
});

serverHttp.listen(4000, () => console.log("Server on port 4000"));
