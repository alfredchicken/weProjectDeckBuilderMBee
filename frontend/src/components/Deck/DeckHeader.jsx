import React from "react";
import "./DeckHeader.css/";

const DeckHeader = ({
  deck,
  deckName,
  setDeckName,
  cardDeckSize,
  setCardDeckSize,
  onSave,
  onClear,
  onOpenLoadModal,
  deckLength,
  onDelete,
  onExport,
}) => (
  <div className="deck-header">
    <div className="deck-info">
      <input className="deck-name-input" type="text" value={deckName} onChange={(e) => setDeckName(e.target.value)} />
      <p>Cards in Deck: {deckLength}</p>
      <p>Creatures: {Array.isArray(deck) ? deck.filter((card) => card?.cardtype?.toLowerCase() === "creature").length : 0}</p>
      <p>Items: {Array.isArray(deck) ? deck.filter((card) => card?.cardtype?.toLowerCase() === "item").length : 0}</p>
      <p>Places: {Array.isArray(deck) ? deck.filter((card) => card?.cardtype?.toLowerCase() === "place").length : 0}</p>
      <p>Resources: {Array.isArray(deck) ? deck.filter((card) => card?.cardtype?.toLowerCase() === "resource").length : 0}</p>
    </div>
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
      <button className="export-to-img" onClick={onExport}>
        Export as Image
      </button>
    </div>
  </div>
);

export default DeckHeader;
