import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { useParams } from "react-router-dom";
import "./user.css";

const socket = io("http://localhost:4000/");

function Users() {
  const { username } = useParams();
  const [msg, setMSG] = useState([]);

  useEffect(() => {
    socket.emit("userConnect", username);
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Message send");
  };

  return (
    <div className="chatDiv">
      <div className="chat">
        {msg.map((mensaje) => (
          <div className={username == mensaje.name ? "you" : "other"}>
            <label>{mensaje.name}</label>
            <p>{mensaje.mensaje}</p>
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit}>
        <input type="text" />
        <button>Enviar</button>
      </form>
    </div>
  );
}

export default Users;
