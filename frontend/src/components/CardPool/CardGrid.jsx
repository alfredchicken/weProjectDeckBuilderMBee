import React from "react";
import "./CardGrid.css/";
import Spinner from "../Spinner/Spinner";

const CardGrid = ({ cards, cardSize, onSelect }) => {
  return cards.length === 0 ? (
    <Spinner />
  ) : (
    <div className="cards-container" style={{ "--card-size": `${cardSize}px` }}>
      {cards.map((card) => (
        <div key={card.cardID} className="card" onClick={() => onSelect(card)}>
          <img src={card.imgURL} alt={card.name} className="img-pool" style={{ width: "100%" }} />
        </div>
      ))}
    </div>
  );
};

export default CardGrid;
