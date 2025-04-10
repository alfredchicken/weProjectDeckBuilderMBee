import { useState, useEffect } from "react";
import { fetchCards, saveDeck } from "../api/api.js";

import CardPool from "../components/CardPool.jsx";
import CardModal from "../components/CardModal.jsx";
import Deck from "../components/Deck.jsx";
import "./DeckBuilder.css";
import DeckLoadModal from "../components/deckLoadModal.jsx";

const DeckBuilder = () => {
  const [cardPool, setCardPool] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);
  const [deck, setDeck] = useState([]);
  const [deckName, setDeckName] = useState("My Deckname"); // Default Deck Name
  const [showLoadModal, setShowLoadModal] = useState(false);

  useEffect(() => {
    const loadCards = async () => {
      const fetchedCards = await fetchCards();
      console.log("Loaded Cards: ", fetchedCards);
      setCardPool(fetchedCards);
    };
    loadCards();
  }, []);

  const handleAddToDeck = (card) => {
    setDeck((prev) => [...prev, card]);
  };

  const handleRemoveFromDeck = (index) => {
    setDeck((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSaveDeck = async () => {
    if (deck.length !== 50) {
      alert("Ein Deck muss genau 50 Karten enthalten.");
      return;
    }

    try {
      const result = await saveDeck(deckName, deck);
      alert(`✅ Deck "${deckName}" wurde gespeichert!`);
    } catch (error) {
      console.error("Fehler beim Speichern:", error);
      alert("Fehler beim Speichern des Decks: " + error.message);
    }
  };

  const handleLoadDeck = async (deckData) => {
    console.log("Lade Deck:", deckData);
    const loadedDeck = deckData.cards.map((id) => cardPool.find((card) => card._id === id)).filter(Boolean); // Filtere ungültige IDs
    console.log("CardPool:", cardPool);
    console.log("Deck Karten IDs:", deckData.cards); // → Überprüfe die IDs, die du hast
    console.log(
      "CardPool Karten IDs:",
      cardPool.map((card) => card._id)
    ); // → Vergleiche sie mit denen im Pool
    console.log("Geladenes Deck:", loadedDeck); // Prüfe hier das geladenen Deck
    setDeck(loadedDeck); // Setze das Deck
  };

  return (
    <div className="deckbuilder-layout">
      <div className="half">
        <CardPool cards={cardPool} onSelect={setSelectedCard} />
      </div>
      <div className="half">
        <Deck
          deck={deck}
          deckName={deckName}
          setDeckName={setDeckName}
          onSave={handleSaveDeck}
          onClear={() => setDeck([])}
          onRemove={handleRemoveFromDeck}
          onOpenLoadModal={() => setShowLoadModal(true)} // 👈 hier!
        />
      </div>

      {/* Modal zur Kartenansicht im Pool */}
      {selectedCard && <CardModal card={selectedCard} onClose={() => setSelectedCard(null)} onAddToDeck={handleAddToDeck} />}

      {/* Modal zum Deck laden */}
      {showLoadModal && <DeckLoadModal onClose={() => setShowLoadModal(false)} onLoad={handleLoadDeck} />}
    </div>
  );
};

export default DeckBuilder;
