import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Map from "./components/Map";
import Calendar from "react-calendar";
import UserProfile from "./pages/UserProfile/UserProfile";

function App() {
  return (
    <div>
       {location.pathname !== '/' && location.pathname !== '/register' && location.pathname !== '/user' && <Navbar />}
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/user" element={<UserProfile />}/>
          <Route path="/maps" element={<Map />} />
          <Route path="/calendar" element={<Calendar />} />
        </Routes>
    </div>
  );
}

export default App;
