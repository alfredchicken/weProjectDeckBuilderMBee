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
      <p>Deck: {deckLength}</p>
      <p>
        {" "}
        <img src="/images/icon_creature.webp" alt="Item Icon" class="icon" />×
        {Array.isArray(deck) ? deck.filter((card) => card?.cardtype?.toLowerCase() === "creature").length : 0}
      </p>
      <p>
        <img src="/images/icon_item.webp" alt="Item Icon" class="icon" />×
        {Array.isArray(deck) ? deck.filter((card) => card?.cardtype?.toLowerCase() === "item").length : 0}
      </p>
      <p>
        {" "}
        <img src="/images/icon_place.webp" alt="Item Icon" class="icon" />×
        {Array.isArray(deck) ? deck.filter((card) => card?.cardtype?.toLowerCase() === "place").length : 0}
      </p>
      <p>
        {" "}
        <img src="/images/icon_ressource.webp" alt="Item Icon" class="icon" />×
        {Array.isArray(deck) ? deck.filter((card) => card?.cardtype?.toLowerCase() === "resource").length : 0}
      </p>
    </div>

    <div className="card-size-controls">
      <button onClick={() => setCardDeckSize(Math.max(cardDeckSize - 10, 80))}>−</button>
      <button onClick={() => setCardDeckSize(Math.min(cardDeckSize + 10, 200))}>+</button>

      <select onChange={(e) => onSortChange(e.target.value)} className="deck-sort-select">
        <option value="">Sort by...</option>
        <option value="creature-place-item">Cardtype</option>
      </select>

      <button className="save-deck-btn deckbutton" onClick={onSave} alt="Save Deck">
        <FontAwesomeIcon icon={faFloppyDisk} />
      </button>
      <button onClick={onOpenLoadModal} className="deckbutton" alt="Load Deck">
        {" "}
        <FontAwesomeIcon icon={faFileImport} />
      </button>
      <button className="clear-deck deckbutton" onClick={onClear} alt="Clear Deck">
        <FontAwesomeIcon icon={faNoteSticky} />
      </button>
      <button
        className="delete-deck deckbutton"
        onClick={() => {
          console.log("Delete Button clicked!");
          onDelete();
        }}
      >
        <FontAwesomeIcon icon={faTrash} />
      </button>
      <button className="export-to-img deckbutton" onClick={onExport} alt="Export to Image">
        <FontAwesomeIcon icon={faImage} />
      </button>
    </div>
  </div>
);

export default DeckHeader;
