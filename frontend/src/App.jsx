import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Navbar/Navbar";
import LoginPage from "./pages/LoginPage";
import DeckBuilder from "./pages/DeckBuilder";
import Deck from "./components/Deck/Deck";
import CardPool from "./components/CardPool/CardPool";
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
    // Optional: Clean up Listener
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
        </Routes>
      </div>
      <Footer />
      <ToastContainer position="bottom-right" autoClose={3000} />
    </BrowserRouter>
  );
  a;
}

export default App;
