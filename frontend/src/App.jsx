import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import LoginPage from "./pages/LoginPage";
import DeckBuilder from "./pages/DeckBuilder";
import Deck from "./components/Deck/Deck";
import CardPool from "./components/CardPool/CardPool";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<DeckBuilder />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/cardpool" element={<CardPool />} />
      </Routes>
      <ToastContainer position="bottom-right" autoClose={3000} />
    </BrowserRouter>
  );
  a;
}

export default App;
