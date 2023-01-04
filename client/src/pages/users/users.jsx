import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { useParams } from "react-router-dom";
import "./user.css";

const socket = io("http://localhost:4000/");

function Users() {
  const { username } = useParams();
  const [mensaje, setMensaje] = useState("");
  const [para, setPara] = useState("");
  const [msg, setMSG] = useState([]);

  useEffect(() => {
    socket.emit("userConnect", username);
  }, []);

  socket.on("newMensaje", (data) => {
    return setMSG([...msg, data]);
  });
  const handleSubmit = (e) => {
    const id = Math.random() * 3000;
    e.preventDefault();
    socket.emit("newMessage", {
      id: id,
      name: username,
      mensaje: mensaje,
      para: para,
    });
    setMSG([
      ...msg,
      {
        id: id,
        desde: username,
        msg: mensaje,
      },
    ]);
    return setMensaje("");
  };

  return (
    <div className="chatDiv">
      <div className="chat">
        {msg.map((mensaje) => (
          <div
            key={mensaje.id}
            className={username == mensaje.desde ? "MSGyou" : "MSGother"}
          >
            <div className={username == mensaje.desde ? "you" : "other"}>
              {username == mensaje.desde ? null : (
                <label>{mensaje.desde}</label>
              )}
              <p>{mensaje.msg}</p>
            </div>
          </div>
        ))}
      </div>
      <input
        onChange={(e) => setPara(e.target.value)}
        value={para}
        id="para"
        type="text"
        placeholder="Para"
      />
      <form onSubmit={handleSubmit}>
        <input
          onChange={(e) => setMensaje(e.target.value)}
          type="text"
          value={mensaje}
        />
        <button>Enviar</button>
      </form>
    </div>
  );
}

export default Users;
