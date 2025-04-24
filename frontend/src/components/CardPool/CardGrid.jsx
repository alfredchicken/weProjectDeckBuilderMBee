import React from "react";
import "./CardGrid.css/";

const CardGrid = ({ cards, cardSize, onSelect }) => (
  <div className="cards-container" style={{ "--card-size": `${cardSize}px` }}>
    {cards.map((card) => (
      <div key={card.cardID} className="card" onClick={() => onSelect(card)}>
        <img src={card.imgURL} alt={card.name} className="img-pool" style={{ width: "100%" }} />
      </div>
    ))}
  </div>
);

export default CardGrid;
