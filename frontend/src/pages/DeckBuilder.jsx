import { useState, useEffect } from "react";
import { fetchCards, saveDeck, deleteDeck } from "../api/api.js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CardPool from "../components/CardPool/CardPool.jsx";
import CardModal from "../components/CardModal/CardModal.jsx";
import Deck from "../components/Deck/Deck.jsx";
import "./DeckBuilder.css";
import DeckLoadModal from "../components/Deck/DeckLoadModal.jsx";
import { set } from "mongoose";

const DeckBuilder = () => {
  const [cardPool, setCardPool] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);
  const [deck, setDeck] = useState([]);
  const [deckName, setDeckName] = useState("My Deckname");
  const [showLoadModal, setShowLoadModal] = useState(false);
  const [deckId, setDeckId] = useState(null);
  const [activeTab, setActiveTab] = useState("pool");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const loadCards = async () => {
      try {
        const fetchedCards = await fetchCards();
        setCardPool(fetchedCards);
      } catch (error) {
        console.log("CATCH ERROR FRONTEND!", error);
        setError("Failed to load cards. Please try again.");
        toast.error("Failed to load cards. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    loadCards();
  }, []);

  const handleAddToDeck = (card) => {
    setDeck((prev) => [...prev, card]);
    console.log("Deck in Modal:", deck);
  };

  const handleRemoveFromDeck = (index) => {
    setDeck((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSaveDeck = async () => {
    if (deck.length !== 50) {
      toast.error("A Deck must contain exactly 50 cards!");
      return;
    }

    try {
      const result = await saveDeck(deckName, deck);
      toast.success(`Your Deck "${deckName}" was saved!`);
    } catch (error) {
      console.error("Error while saving Deck:", error);
      toast.error("You have to be logged in to save a deck!");
    }
  };

  const handleLoadDeck = async (deckData) => {
    console.log("Load Deck:", deckData);
    setDeck(deckData.cards);
    console.log("Setze DeckName:", deckData.name);
    setDeckName(deckData.name);
    setDeckId(deckData._id);
    setShowLoadModal(false);
  };

  const handleDeleteDeck = async () => {
    if (!deckId) {
      toast.error("No saved deck to delete!");
      return;
    }

    try {
      await deleteDeck(deckId);
      toast.success("Deck deleted!");
      setDeck([]); // Reset deck state
      setDeckName("My Deckname");
      setDeckId(null); // Reset Deck ID
    } catch (error) {
      console.error("Error deleting deck:", error);
      toast.error("Failed to delete deck");
    }
  };

  return (
    <>
      <div className="tab-buttons mobile-only">
        <button onClick={() => setActiveTab("pool")} className={activeTab === "pool" ? "active" : ""}>
          Card Pool
        </button>
        <button onClick={() => setActiveTab("deck")} className={activeTab === "deck" ? "active" : ""}>
          Deck
        </button>
      </div>
      <div className="deckbuilder-layout">
        <div className={`half ${activeTab === "pool" ? "visible" : "hidden-on-mobile"}`}>
          <CardPool cards={cardPool} onSelect={setSelectedCard} loading={loading} />
        </div>
        <div className={`half ${activeTab === "deck" ? "visible" : "hidden-on-mobile"}`}>
          <Deck
            deck={deck}
            deckName={deckName}
            setDeckName={setDeckName}
            onSave={handleSaveDeck}
            onClear={() => setDeck([])}
            onRemove={handleRemoveFromDeck}
            onOpenLoadModal={() => setShowLoadModal(true)}
            onDelete={handleDeleteDeck}
          />
        </div>

        {/* Modal zur Kartenansicht im Pool */}
        {selectedCard && <CardModal card={selectedCard} onClose={() => setSelectedCard(null)} onAddToDeck={handleAddToDeck} deck={deck} />}

        {/* Modal zum Deck laden */}
        {showLoadModal && <DeckLoadModal onClose={() => setShowLoadModal(false)} onLoad={handleLoadDeck} />}
      </div>
    </>
  );
};

export default DeckBuilder;
