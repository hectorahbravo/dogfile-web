import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./pages/Login/Login";
import Register from "./pages/Register";
import Home from "./components/Home/Home";
import Map from "./components/Map";
import Calendar from "react-calendar";

function App() {
  return (
    <div>
       {location.pathname !== '/' && <Navbar />}
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/maps" element={<Map />} />
          <Route path="/calendar" element={<Calendar />} />
        </Routes>
    </div>
  );
}

export default App;
