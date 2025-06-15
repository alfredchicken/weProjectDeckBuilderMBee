import "./Deck.css";
import { useState, useEffect } from "react";
import DeckHeader from "./DeckHeader";
import DeckGrid from "./DeckGrid";

const Deck = ({ deck, deckName, setDeckName, onSave, onClear, onRemove, onOpenLoadModal, onDelete }) => {
  const [cardDeckSize, setCardDeckSize] = useState(120);
  const [removingIndex, setRemovingIndex] = useState(null);
  const [exportDeck, setExportDeck] = useState(() => () => {});
  const [sortedDeck, setSortedDeck] = useState(deck);

  const handleSortChange = (sortType) => {
    if (sortType === "creature-place-item") {
      const order = { creature: 1, place: 2, item: 3, resource: 4 };
      const sorted = [...deck].sort((a, b) => {
        const typeA = a.cardtype?.toLowerCase() || "";
        const typeB = b.cardtype?.toLowerCase() || "";
        return (order[typeA] || 999) - (order[typeB] || 999);
      });
      setSortedDeck(sorted);
    } else {
      setSortedDeck(deck); // fall back to original order
    }
  };

  useEffect(() => {
    setSortedDeck(deck);
  }, [deck]);

  return (
    <div className="deck-container">
      <DeckHeader
        deck={deck}
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
        onSortChange={handleSortChange}
      />
      <DeckGrid
        deck={deck}
        sortedDeck={sortedDeck}
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
