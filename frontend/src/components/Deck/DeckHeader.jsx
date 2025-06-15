import React from "react";
import "./DeckHeader.css/";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFloppyDisk } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faFileImport } from "@fortawesome/free-solid-svg-icons";
import { faImage } from "@fortawesome/free-solid-svg-icons";
import { faNoteSticky } from "@fortawesome/free-solid-svg-icons";

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
  onSortChange,
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

      <select onChange={(e) => onSortChange(e.target.value)} className="deck-sort-select">
        <option value="">Sort by...</option>
        <option value="creature-place-item">Cardtype</option>
      </select>

      <button className="save-deck-btn" onClick={onSave} alt="Save Deck">
        <FontAwesomeIcon icon={faFloppyDisk} />
      </button>
      <button onClick={onOpenLoadModal} alt="Load Deck">
        {" "}
        <FontAwesomeIcon icon={faFileImport} />
      </button>
      <button className="clear-deck" onClick={onClear} alt="Clear Deck">
        <FontAwesomeIcon icon={faNoteSticky} />
      </button>
      <button
        className="delete-deck"
        onClick={() => {
          console.log("Delete Button clicked!");
          onDelete();
        }}
      >
        <FontAwesomeIcon icon={faTrash} />
      </button>
      <button className="export-to-img" onClick={onExport} alt="Export to Image">
        <FontAwesomeIcon icon={faImage} />
      </button>
    </div>
  </div>
);

export default DeckHeader;
