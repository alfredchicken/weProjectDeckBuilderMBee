import { Routes, Route } from "react-router-dom";
import { BrowserRouter as Router, Link } from "react-router-dom";
import DeckBuilder from "./pages/DeckBuilder";
import LoginPage from "./pages/LoginPage";
import { ToastContainer } from "react-toastify";
import Header from "./components/Header/Header";

function App() {
  return (
    <>
      <Header />

      <Routes>
        <Route path="/" element={<DeckBuilder />} /> {/* <== Hier */}
        <Route path="/deckbuilder" element={<DeckBuilder />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
      <ToastContainer position="bottom-right" autoClose={3000} />
    </>
  );
}

export default App;
