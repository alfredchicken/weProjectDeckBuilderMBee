import React from "react";
import "./DeckGrid.css";

const DeckGrid = ({ deck, cardDeckSize, onRemove, removingIndex, setRemovingIndex }) => (
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
);

export default DeckGrid;
