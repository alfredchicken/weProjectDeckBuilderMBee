import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Navbar/Navbar";
import LoginPage from "./pages/LoginPage";
import DeckBuilder from "./pages/DeckBuilder";
import Deck from "./components/Deck/Deck";
import CardPool from "./components/CardPool/CardPool";
import { ToastContainer } from "react-toastify";
import AdminDashboard from "./pages/AdminDashboard";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<DeckBuilder />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/cardpool" element={<CardPool />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
      <ToastContainer position="bottom-right" autoClose={3000} />
    </BrowserRouter>
  );
  a;
}

export default App;
