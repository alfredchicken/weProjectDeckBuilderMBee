import React from "react";
import "./DeckHeader.css/";

const DeckHeader = ({ deckName, setDeckName, cardDeckSize, setCardDeckSize, onSave, onClear, onOpenLoadModal, deckLength, onDelete }) => (
  <div className="deck-header">
    <input className="deck-name-input" type="text" value={deckName} onChange={(e) => setDeckName(e.target.value)} />
    <p>Cards in Deck: {deckLength}</p>
    <div className="cardDeck-size-slider">
      <input
        className="cardDeck-size-range"
        type="range"
        min="80"
        max="200"
        step="10"
        value={cardDeckSize}
        onChange={(e) => setCardDeckSize(Number(e.target.value))}
      />
      <button className="save-deck-btn" onClick={onSave}>
        Save Deck
      </button>
      <button className="clear-deck" onClick={onClear}>
        Clear Deck
      </button>
      <button onClick={onOpenLoadModal}>Load Deck</button>
      <button
        className="delete-deck"
        onClick={() => {
          console.log("Delete Button clicked!");
          onDelete();
        }}
      >
        Delete Deck
      </button>
    </div>
  </div>
);

export default DeckHeader;
