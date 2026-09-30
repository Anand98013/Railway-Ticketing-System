import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Trains from "./pages/Trains";
import BookTicket from "./pages/BookTicket";
import Bookings from "./pages/Bookings";
import Status from "./pages/Status";
import Profile from "./pages/Profile";
import PnrStatus from "./pages/PnrStatus";

export default function App() {
  return (
    <AuthProvider>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/trains" element={<Trains />} />
        <Route path="/status" element={<Status />} />
        <Route path="/pnr-status" element={<PnrStatus />} />
        <Route path="/book/:trainId" element={
          <ProtectedRoute><BookTicket /></ProtectedRoute>
        } />
        <Route path="/bookings" element={
          <ProtectedRoute><Bookings /></ProtectedRoute>
        } />
        <Route path="/profile" element={
          <ProtectedRoute><Profile /></ProtectedRoute>
        } />
      </Routes>
      <footer className="footer">© 2026 RailGo · Railway Ticketing System</footer>
    </AuthProvider>
  );
}
