import { useEffect, useState } from "react";
import { fetchAllDecks } from "../api/api.js";

const DeckLoadModal = ({ onClose, onLoad }) => {
  const [decks, setDecks] = useState([]);

  useEffect(() => {
    const loadDecks = async () => {
      try {
        const result = await fetchAllDecks();
        console.log("Geladene Decks:", result);
        setDecks(result);
      } catch (err) {
        console.error("Fehler beim Laden der Decks:", err);
      }
    };
    loadDecks();
  }, []);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>Deck auswählen</h2>
        <ul>
          {decks.map((deck) => (
            <li key={deck._id}>
              <button onClick={() => onLoad(deck)}>
                {deck.name} ({deck.cards.length} Karten)
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DeckLoadModal;
