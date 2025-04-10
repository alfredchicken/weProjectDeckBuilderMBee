import { useState, useEffect } from "react";
import CardPool from "../components/CardPool.jsx";
import { fetchCards } from "../api/api.js";
import CardModal from "../components/CardModal.jsx";
import Deck from "./Deck";

const DeckBuilder = () => {
  const [cardPool, setCardPool] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);

  useEffect(() => {
    const loadCards = async () => {
      const fetchedCards = await fetchCards();
      console.log("Loaded Cards: ", fetchedCards);
      setCardPool(fetchedCards);
    };
    loadCards();
  }, []);

  return (
    <div>
      <CardPool cards={cardPool} onSelect={setSelectedCard} />
      <CardModal card={selectedCard} onClose={() => setSelectedCard(null)} />
    </div>
  );
};

export default DeckBuilder;
