import { useEffect, useState } from "react";
import { fetchAllDecks } from "../../api/api.js";
import "./DeckLoadModal.css";

const DeckLoadModal = ({ onClose, onLoad }) => {
  const [decks, setDecks] = useState([]);

  // useEffect sorgt dafür, dass Decks beim Laden des Modals geladen werden
  useEffect(() => {
    const loadDecks = async () => {
      try {
        const result = await fetchAllDecks(); // Holt nur Decks des eingeloggten Users
        console.log("Geladene Decks:", result);
        setDecks(result);
      } catch (err) {
        console.error("Fehler beim Laden der Decks:", err);
      }
    };

    loadDecks();
  }, []); // empty array = only once useEffect

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>Choose Deck</h2>
        <ul>
          {decks.length === 0 ? (
            <p>No decks found!</p>
          ) : (
            decks.map((deck) => (
              <li key={deck._id}>
                <button onClick={() => onLoad(deck)}>
                  {deck.name} ({deck.cards.length} Cards)
                </button>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
};

export default DeckLoadModal;
