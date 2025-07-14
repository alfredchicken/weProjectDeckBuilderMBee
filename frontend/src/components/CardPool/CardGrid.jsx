import React from "react";
import "./CardGrid.css/";
import Spinner from "../Spinner/Spinner";

const CardGrid = ({ cards, cardSize, onSelect, loading }) => {
  if (loading) return <Spinner />;
  if (cards.length === 0) return <div>No cards found.</div>;

  return (
    <div className="cards-container" style={{ "--card-size": `${cardSize}px` }}>
      {cards.map((card) => (
        <div key={card.cardID} className="card" onClick={() => onSelect(card)}>
          <img src={`http://localhost:5000/images/${card.imgURL}`} alt={card.name} className="img-pool"/>
        </div>
      ))}
    </div>
  );
};

export default CardGrid;
