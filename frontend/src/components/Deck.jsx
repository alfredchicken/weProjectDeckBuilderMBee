import "./Deck.css";
import { useState, useEffect } from "react";

const Deck = ({ deck, deckName, setDeckName, onSave, onClear, onRemove, onOpenLoadModal }) => {
  const [cardDeckSize, setCardDeckSize] = useState(120); // Standardgrösse 120px
  const [removingIndex, setRemovingIndex] = useState(null); // für entfernen Animation

  return (
    <div className="deck-container">
      <div className="deck-header">
        <input className="deck-name-input" type="text" value={deckName} onChange={(e) => setDeckName(e.target.value)} />
        <p>Cards in Deck: {deck.length}</p>
        <div className="cardDeck-size-slider">
          <input
            className="cardDeck-size-range"
            type="range"
            id="cardDeckSize"
            name="cardDeckSize"
            min="80"
            max="200"
            step="10"
            value={cardDeckSize}
            onChange={(e) => setCardDeckSize(Number(e.target.value))}
          />
          <button className="save-deck-btn" onClick={onSave}>
            Save Deck
          </button>
          <button className="clear-deck" onClick={() => onClear()}>
            Clear Deck
          </button>
          <button onClick={onOpenLoadModal}>Load Deck</button>
        </div>
      </div>

      <div className="deck-cards" style={{ "--card-size": `${cardDeckSize}px` }}>
        {deck.map((card, index) => (
          <div
            key={`${card.cardID}-${index}`}
            className={`card ${removingIndex === index ? "fade-out" : ""}`}
            onClick={() => {
              setRemovingIndex(index);
              setTimeout(() => {
                onRemove(index);
                setRemovingIndex(null);
              }, 300);
            }}
          >
            <img src={card.imgURL} alt={card.name} className="img-pool" style={{ width: "100%" }} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Deck;
