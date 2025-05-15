import "./Deck.css";
import { useState } from "react";
import DeckHeader from "./DeckHeader";
import DeckGrid from "./DeckGrid";

const Deck = ({ deck, deckName, setDeckName, onSave, onClear, onRemove, onOpenLoadModal, onDelete }) => {
  const [cardDeckSize, setCardDeckSize] = useState(120);
  const [removingIndex, setRemovingIndex] = useState(null);
  const [exportDeck, setExportDeck] = useState(() => () => {});

  return (
    <div className="deck-container">
      <DeckHeader
        deckName={deckName}
        setDeckName={setDeckName}
        cardDeckSize={cardDeckSize}
        setCardDeckSize={setCardDeckSize}
        onSave={onSave}
        onClear={onClear}
        onOpenLoadModal={onOpenLoadModal}
        deckLength={deck?.length || 0}
        onDelete={onDelete}
        onExport={exportDeck}
      />
      <DeckGrid
        deck={deck}
        cardDeckSize={cardDeckSize}
        onRemove={onRemove}
        removingIndex={removingIndex}
        setRemovingIndex={setRemovingIndex}
        onExportReady={setExportDeck}
      />
    </div>
  );
};

export default Deck;
