import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Navbar/Navbar";
import LoginPage from "./pages/LoginPage";
import DeckBuilder from "./pages/DeckBuilder";
import MyAccount from "./pages/MyAccount";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Footer from "./components/Footer/Footer";
import { ToastContainer } from "react-toastify";
import AdminDashboard from "./pages/AdminDashboard";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { io } from "socket.io-client";
import "./App.css";

const socket = io("http://localhost:5000", {
  withCredentials: true,
});

function App() {
  useEffect(() => {
    socket.on("new_card", (data) => {
      toast.info(`New card "${data.name}" added!`);
    });
    return () => socket.off("new_card");
  }, []);

  return (
    <BrowserRouter>
      <Header />
      <div className="app-wrapper">
        <Routes>
          <Route path="/" element={<DeckBuilder />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/my-account" element={<MyAccount />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
        </Routes>
      </div>
      <Footer />
      <ToastContainer position="bottom-right" autoClose={3000} />
    </BrowserRouter>
  );
  a;
}

export default App;
