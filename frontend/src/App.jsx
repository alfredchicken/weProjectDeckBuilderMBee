import { Routes, Route } from "react-router-dom";
import DeckBuilder from "./pages/DeckBuilder";

function App() {
  return (
    <Routes>
      <Route path="/" element={<DeckBuilder />} />
    </Routes>
  );
}

export default App;
