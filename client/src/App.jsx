import { Route, Routes } from "react-router-dom";
import Login from "./pages/Log/Login";
import Users from "./pages/users/users";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/user/:username" element={<Users />} />
    </Routes>
  );
}

export default App;
