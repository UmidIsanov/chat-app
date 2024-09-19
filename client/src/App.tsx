import { Routes, Route, Navigate } from "react-router-dom";
import Register from "./pages/Register";
import Chat from "./pages/Chat";
import Login from "./pages/Login";
import Container from "react-bootstrap/Container";
import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from "./components/NavBar";

function App() {
  return (
    <>
      <NavBar />
      <Container className="text-secondary">
        <Routes>
          <Route path="/" element={<Chat />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/*" element={<Navigate to="/" />} />
        </Routes>
      </Container>
    </>
  );
}

export default App;
