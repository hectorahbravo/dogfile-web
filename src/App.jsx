import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Map from "./components/Map";
import Calendar from "./components/Calendar/Calendar";
import Reports from "./components/Reports";
import Recommendation from "./components/Recommendation";
import UserProfile from "./pages/UserProfile/UserProfile";
import ProtectedRoute from "./components/ProtectedRoute";
import CreateDogPage from "./pages/CreateDogPage/CreateDogPage";
import DogProfilePage from "./pages/DogProfilePage/DogProfilePage";
import { useLocation } from "react-router-dom";
import EditDog from "./pages/EditDogProfile/EditDogProfile";
import ReminderForm from "./components/Reminder/ReminderForm";
import EditProfile from "./pages/EdtiProfile/EditProfile";

import RemindersCalendar from "./components/Reminder/RemindersCalendar";
import "./App.css";
import Activation from "./components/Activation";

function App() {
  const location = useLocation();
  return (
    <div>
      {location.pathname !== "/" &&
        location.pathname !== "/register" &&
        location.pathname !== "/user" &&
        location.pathname !== "/users/:userId/edit" &&
        location.pathname !== "/create-dog/:userId" && (
          <Navbar className="navbar" />
        )}
      <Routes>
        <Route path="/activate/:token" element={<Activation />} />
        <Route path="/" element={<Login />} />
        <Route
          path="/create-dog/:userId"
          element={
            <ProtectedRoute>
              <CreateDogPage />
            </ProtectedRoute>
          }
        />
        <Route path="/register" element={<Register />} />
        <Route
          path="/:userId/dogs/:dogId"
          element={
            <ProtectedRoute>
              <DogProfilePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/users/:userId/dogs/:dogId/edit"
          element={
            <ProtectedRoute>
              <EditDog />
            </ProtectedRoute>
          }
        />
        <Route
          path="/users/:userId/edit"
          element={
            <ProtectedRoute>
              <EditProfile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/user/"
          element={
            <ProtectedRoute>
              <UserProfile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/user"
          element={
            <ProtectedRoute>
              <UserProfile />
            </ProtectedRoute>
          }
        />
        <Route path="/maps" element={<Map />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/reports/new" element={<Reports />} />
        <Route path="/recommendation/new" element={<Recommendation />} />
        <Route path="/reminder/new" element={<ReminderForm />} />
        <Route path="/reminders" element={<RemindersCalendar />} />
      </Routes>
    </div>
  );
}

export default App;
