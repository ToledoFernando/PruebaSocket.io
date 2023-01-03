import React from "react";
import { Button, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const input = React.useRef();
  const [name, setName] = React.useState("");
  const [Error, setError] = React.useState(false);
  const [ErrorButton, setErrorButton] = React.useState(true);

  const handleChange = (e) => {
    setName(e.target.value);
  };

  const validate = () => {
    if (name.length < 3) {
      setErrorButton(true);
      return setError(true);
    } else {
      setErrorButton(false);
      return setError(false);
    }
  };

  return (
    <div
      style={{
        width: "100vh",
        display: "flex",
        justifyContent: "center",
        gap: "10px",
      }}
    >
      <TextField
        id="outlined-basic"
        label="Nombre de Usuario"
        variant="outlined"
        onChange={handleChange}
        onBlur={validate}
        error={Error}
        helperText={Error ? "Nombre de usuario muy corto" : null}
        ref={input}
      />
      <Button
        onClick={() => navigate(`/user/${name}`)}
        disabled={ErrorButton}
        variant="contained"
        size="large"
      >
        Hello world
      </Button>
    </div>
  );
}

export default Login;
