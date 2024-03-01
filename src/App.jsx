import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./components/Home";
import Map from "./components/Map";
import Calendar from "react-calendar";
import Reports from "./components/Reports";
import Recomendation from "./components/Recomendation";

function App() {
  return (
    <div>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/maps" element={<Map />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/recomendation" element={<Recomendation />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
